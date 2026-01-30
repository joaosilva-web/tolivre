"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, Building, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

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
  lastMessage?: {
    content: string;
    createdAt: string;
  };
  unreadCount: number;
  updatedAt: string;
}

interface StaffConversationListProps {
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StaffConversationList({
  status,
  selectedId,
  onSelect,
}: StaffConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ status });
      const res = await fetch(`/api/support/admin/conversations?${params}`);
      if (!res.ok) throw new Error("Erro ao carregar conversas");

      const data = await res.json();
      if (data.success) {
        setConversations(data.data.conversations);
        setTotal(data.data.total);
      }
    } catch (error) {
      console.error("[StaffConversationList] Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [status]);

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "conversa" : "conversas"}
        </p>
      </div>

      {/* Lista */}
      <ScrollArea className="flex-1">
        {conversations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Nenhuma conversa encontrada</p>
          </div>
        ) : (
          <div className="divide-y">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelect(conversation.id)}
                className={cn(
                  "w-full p-4 text-left hover:bg-muted/50 transition-colors",
                  selectedId === conversation.id && "bg-muted",
                )}
              >
                {/* Empresa e Usuário */}
                <div className="flex items-start gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="h-3 w-3 text-muted-foreground shrink-0" />
                      <p className="text-xs font-medium text-muted-foreground truncate">
                        {conversation.company.nomeFantasia}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground shrink-0" />
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.user.name || conversation.user.email}
                      </p>
                    </div>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs shrink-0">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>

                {/* Assunto */}
                <h4 className="font-medium text-sm line-clamp-1 mb-1">
                  {conversation.subject}
                </h4>

                {/* Última Mensagem */}
                {conversation.lastMessage && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {conversation.lastMessage.content}
                  </p>
                )}

                {/* Footer: Status e Timestamp */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs text-white border-0",
                        getStatusColor(conversation.status),
                      )}
                    >
                      {getStatusLabel(conversation.status)}
                    </Badge>
                    {conversation.assignedTo && (
                      <span className="text-xs text-muted-foreground">
                        • {conversation.assignedTo.name}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(conversation.updatedAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
