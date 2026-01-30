"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  ArrowLeft,
  Send,
  Loader2,
  UserCheck,
  X as CloseIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useWebSocket } from "@/context/WebSocketProvider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type {
  SupportMessageNotification,
  SupportConversationUpdate,
} from "@/lib/websocket";

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  isStaff: boolean;
  createdAt: string;
}

interface Conversation {
  id: string;
  subject: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  company: {
    id: string;
    nomeFantasia: string;
  };
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  assignedTo: {
    id: string;
    name: string | null;
  } | null;
  assignedToId: string | null;
}

interface StaffConversationViewProps {
  conversationId: string;
  onBack: () => void;
}

export function StaffConversationView({
  conversationId,
  onBack,
}: StaffConversationViewProps) {
  const { socket, connected } = useWebSocket();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<string | null>(null);

  // Carregar conversa e mensagens
  const loadConversation = async () => {
    try {
      setLoading(true);
      const [convRes, msgRes] = await Promise.all([
        fetch(
          `/api/support/admin/conversations?conversationId=${conversationId}`,
        ),
        fetch(`/api/support/conversations/${conversationId}/messages`),
      ]);

      if (convRes.ok) {
        const convData = await convRes.json();
        if (convData.success && convData.data.conversations.length > 0) {
          setConversation(convData.data.conversations[0]);
        }
      }

      if (msgRes.ok) {
        const msgData = await msgRes.json();
        if (msgData.success) {
          setMessages(
            msgData.data.map(
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
          );
        }
      }
    } catch (error) {
      console.error("[StaffConversationView] Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversation();
  }, [conversationId]);

  // Auto-scroll quando novas mensagens chegam
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.id !== lastMessageRef.current) {
      lastMessageRef.current = lastMessage.id;
      scrollToBottom();
    }
  }, [messages]);

  // WebSocket listeners
  useEffect(() => {
    if (!socket || !connected) return;

    const handleSupportMessage = (data: SupportMessageNotification) => {
      if (data.conversationId === conversationId) {
        setMessages((prev) => {
          const isDuplicate = prev.some((msg) => msg.id === data.message.id);
          if (isDuplicate) return prev;

          return [...prev, data.message];
        });
      }
    };

    const handleConversationUpdated = (data: SupportConversationUpdate) => {
      if (data.conversationId === conversationId && conversation) {
        setConversation((prev) =>
          prev
            ? {
                ...prev,
                status: data.status || prev.status,
                assignedToId: data.assignedToId || prev.assignedToId,
                assignedTo: data.assignedToName
                  ? { id: data.assignedToId || "", name: data.assignedToName }
                  : prev.assignedTo,
              }
            : null,
        );
      }
    };

    socket.on("supportMessage", handleSupportMessage);
    socket.on("supportConversationUpdated", handleConversationUpdated);

    return () => {
      socket.off("supportMessage", handleSupportMessage);
      socket.off("supportConversationUpdated", handleConversationUpdated);
    };
  }, [socket, connected, conversationId]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch(
        `/api/support/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: inputValue.trim() }),
        },
      );

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          // Adicionar mensagem otimisticamente
          const newMessage = data.data;
          setMessages((prev) => {
            const isDuplicate = prev.some((msg) => msg.id === newMessage.id);
            if (isDuplicate) return prev;

            return [
              ...prev,
              {
                id: newMessage.id,
                content: newMessage.content,
                senderId: newMessage.senderId,
                senderName: newMessage.sender?.name || "Staff",
                isStaff: newMessage.isStaff,
                createdAt: newMessage.createdAt,
              },
            ];
          });
        }
        setInputValue("");
      }
    } catch (error) {
      console.error("[StaffConversationView] Erro ao enviar:", error);
    } finally {
      setSending(false);
    }
  };

  const handleAssign = async () => {
    try {
      const res = await fetch(
        `/api/support/conversations/${conversationId}/assign`,
        {
          method: "POST",
        },
      );
      if (res.ok) {
        await loadConversation();
      }
    } catch (error) {
      console.error("[StaffConversationView] Erro ao atribuir:", error);
    }
  };

  const handleClose = async () => {
    try {
      const res = await fetch(
        `/api/support/conversations/${conversationId}/close`,
        {
          method: "POST",
        },
      );
      if (res.ok) {
        await loadConversation();
      }
    } catch (error) {
      console.error("[StaffConversationView] Erro ao fechar:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-yellow-500";
      case "IN_PROGRESS":
        return "bg-blue-500";
      case "CLOSED":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "OPEN":
        return "Aberta";
      case "IN_PROGRESS":
        return "Em andamento";
      case "CLOSED":
        return "Fechada";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>Conversa não encontrada</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8 lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">
              {conversation.subject}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {conversation.company.nomeFantasia} •{" "}
              {conversation.user.name || conversation.user.email}
            </p>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs text-white border-0",
              getStatusColor(conversation.status),
            )}
          >
            {getStatusLabel(conversation.status)}
          </Badge>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          {conversation.status !== "CLOSED" && !conversation.assignedToId && (
            <Button size="sm" variant="outline" onClick={handleAssign}>
              <UserCheck className="h-4 w-4 mr-2" />
              Atribuir a mim
            </Button>
          )}
          {conversation.status !== "CLOSED" && (
            <Button size="sm" variant="outline" onClick={handleClose}>
              <CloseIcon className="h-4 w-4 mr-2" />
              Fechar conversa
            </Button>
          )}
        </div>
      </div>

      {/* Mensagens */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.isStaff ? "justify-end" : "justify-start",
              )}
            >
              {!message.isStaff && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {getInitials(message.senderName)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-lg px-3 py-2",
                  message.isStaff
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted",
                )}
              >
                {!message.isStaff && (
                  <p className="text-xs font-medium mb-1">
                    {message.senderName}
                  </p>
                )}
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    message.isStaff
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground",
                  )}
                >
                  {format(new Date(message.createdAt), "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              {message.isStaff && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(message.senderName)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua resposta..."
            disabled={sending || conversation.status === "CLOSED"}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={
              !inputValue.trim() || sending || conversation.status === "CLOSED"
            }
            size="icon"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        {conversation.status === "CLOSED" && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Esta conversa foi encerrada
          </p>
        )}
      </div>
    </div>
  );
}
