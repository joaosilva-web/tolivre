"use client";

import { useEffect, useState } from "react";
import { useWebSocket } from "@/context/WebSocketProvider";
import type {
  SupportMessageNotification,
  SupportConversationUpdate,
} from "@/lib/websocket";

interface Conversation {
  id: string;
  subject: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  lastMessage?: {
    content: string;
    createdAt: string;
  };
  unreadCount: number;
  updatedAt: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  isStaff: boolean;
  createdAt: string;
}

export function useSupportChat() {
  const { socket, connected } = useWebSocket();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Carregar conversas
  const loadConversations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/support/conversations");
      if (!res.ok) throw new Error("Erro ao carregar conversas");
      const data = await res.json();
      if (data.success) {
        setConversations(data.data);
        const total = data.data.reduce(
          (sum: number, conv: Conversation) => sum + conv.unreadCount,
          0,
        );
        setUnreadCount(total);
      }
    } catch (error) {
      console.error("[useSupportChat] Erro ao carregar conversas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar mensagens de uma conversa
  const loadMessages = async (conversationId: string) => {
    try {
      const res = await fetch(
        `/api/support/conversations/${conversationId}/messages`,
      );
      if (!res.ok) throw new Error("Erro ao carregar mensagens");
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => ({
          ...prev,
          [conversationId]: data.data.map(
            (msg: {
              id: string;
              content: string;
              senderId: string;
              sender: { name: string | null };
              isStaff: boolean;
              createdAt: string;
            }) => ({
              id: msg.id,
              content: msg.content,
              senderId: msg.senderId,
              senderName: msg.sender.name || "Usuário",
              isStaff: msg.isStaff,
              createdAt: msg.createdAt,
            }),
          ),
        }));
      }
    } catch (error) {
      console.error("[useSupportChat] Erro ao carregar mensagens:", error);
    }
  };

  // Enviar mensagem
  const sendMessage = async (conversationId: string, content: string) => {
    try {
      const res = await fetch(
        `/api/support/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        },
      );
      if (!res.ok) throw new Error("Erro ao enviar mensagem");
      const data = await res.json();
      if (data.success) {
        // Adicionar mensagem otimisticamente (já vem da API)
        const newMessage = data.data;
        setMessages((prev) => ({
          ...prev,
          [conversationId]: [
            ...(prev[conversationId] || []),
            {
              id: newMessage.id,
              content: newMessage.content,
              senderId: newMessage.senderId,
              senderName: newMessage.sender?.name || "Você",
              isStaff: newMessage.isStaff,
              createdAt: newMessage.createdAt,
            },
          ],
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("[useSupportChat] Erro ao enviar mensagem:", error);
      return false;
    }
  };

  // Criar nova conversa
  const createConversation = async (subject: string, firstMessage: string) => {
    try {
      const res = await fetch("/api/support/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, firstMessage }),
      });
      if (!res.ok) throw new Error("Erro ao criar conversa");
      const data = await res.json();
      if (data.success) {
        await loadConversations();
        return data.data.id;
      }
      return null;
    } catch (error) {
      console.error("[useSupportChat] Erro ao criar conversa:", error);
      return null;
    }
  };

  // Marcar mensagens como lidas
  const markAsRead = async (conversationId: string) => {
    try {
      const res = await fetch(
        `/api/support/conversations/${conversationId}/read`,
        {
          method: "POST",
        },
      );
      if (!res.ok) throw new Error("Erro ao marcar como lido");
      const data = await res.json();
      if (data.success) {
        // Atualizar contador local
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv,
          ),
        );
        // Recalcular total
        const total = conversations.reduce(
          (sum, conv) =>
            conv.id === conversationId ? sum : sum + conv.unreadCount,
          0,
        );
        setUnreadCount(total);
      }
    } catch (error) {
      console.error("[useSupportChat] Erro ao marcar como lido:", error);
    }
  };

  // WebSocket listeners
  useEffect(() => {
    if (!socket || !connected) return;

    const handleSupportMessage = (data: SupportMessageNotification) => {
      const { conversationId, message } = data;

      // Adicionar mensagem à lista (evitar duplicatas)
      setMessages((prev) => {
        const existing = prev[conversationId] || [];
        const isDuplicate = existing.some((msg) => msg.id === message.id);
        if (isDuplicate) return prev;

        return {
          ...prev,
          [conversationId]: [...existing, message],
        };
      });

      // Se for mensagem do staff, incrementar contador
      if (message.isStaff) {
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  unreadCount: conv.unreadCount + 1,
                  updatedAt: message.createdAt,
                }
              : conv,
          ),
        );
        setUnreadCount((prev) => prev + 1);
      }
    };

    const handleConversationUpdated = (data: SupportConversationUpdate) => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === data.conversationId
            ? { ...conv, status: data.status || conv.status }
            : conv,
        ),
      );
    };

    socket.on("supportMessage", handleSupportMessage);
    socket.on("supportConversationUpdated", handleConversationUpdated);

    return () => {
      socket.off("supportMessage", handleSupportMessage);
      socket.off("supportConversationUpdated", handleConversationUpdated);
    };
  }, [socket, connected]);

  // Carregar conversas na montagem
  useEffect(() => {
    loadConversations();
  }, []);

  return {
    conversations,
    messages,
    unreadCount,
    loading,
    connected,
    loadConversations,
    loadMessages,
    sendMessage,
    createConversation,
    markAsRead,
  };
}
