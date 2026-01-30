"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSupportChat } from "@/hooks/useSupportChat";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ConversationViewProps {
  conversationId: string;
  onBack: () => void;
}

export function ConversationView({
  conversationId,
  onBack,
}: ConversationViewProps) {
  const { messages, conversations, loadMessages, sendMessage, markAsRead } =
    useSupportChat();
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<string | null>(null);

  const conversation = conversations.find((c) => c.id === conversationId);
  const conversationMessages = useMemo(
    () => messages[conversationId] || [],
    [messages, conversationId],
  );

  // Carregar mensagens ao montar
  useEffect(() => {
    loadMessages(conversationId);
    markAsRead(conversationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  // Auto-scroll quando novas mensagens chegam
  useEffect(() => {
    const lastMessage = conversationMessages[conversationMessages.length - 1];
    if (lastMessage && lastMessage.id !== lastMessageRef.current) {
      lastMessageRef.current = lastMessage.id;
      scrollToBottom();
    }
  }, [conversationMessages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || sending) return;

    setSending(true);
    const success = await sendMessage(conversationId, inputValue.trim());
    if (success) {
      setInputValue("");
    }
    setSending(false);
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

  return (
    <div className="flex flex-col h-full">
      {/* Header da Conversa */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h4 className="font-medium text-sm flex-1 line-clamp-1">
            {conversation?.subject || "Conversa"}
          </h4>
        </div>
        {conversation && (
          <Badge
            variant="outline"
            className={cn(
              "text-xs text-white border-0 ml-10",
              getStatusColor(conversation.status),
            )}
          >
            {getStatusLabel(conversation.status)}
          </Badge>
        )}
      </div>

      {/* Mensagens */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {conversationMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.isStaff ? "justify-start" : "justify-end",
              )}
            >
              {message.isStaff && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(message.senderName)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-lg px-3 py-2",
                  message.isStaff
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground",
                )}
              >
                {message.isStaff && (
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
                      ? "text-muted-foreground"
                      : "text-primary-foreground/70",
                  )}
                >
                  {format(new Date(message.createdAt), "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              {!message.isStaff && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    EU
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input de Mensagem */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={sending || conversation?.status === "CLOSED"}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={
              !inputValue.trim() || sending || conversation?.status === "CLOSED"
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
        {conversation?.status === "CLOSED" && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Esta conversa foi encerrada
          </p>
        )}
      </div>
    </div>
  );
}
