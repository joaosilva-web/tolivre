"use client";

import { useState } from "react";
import { X, Minimize2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConversationList } from "./ConversationList";
import { ConversationView } from "./ConversationView";
import { NewConversationForm } from "./NewConversationForm";
import { useSupportChat } from "@/hooks/useSupportChat";

type ViewMode = "list" | "chat" | "new";

interface SupportChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportChatWidget({ isOpen, onClose }: SupportChatWidgetProps) {
  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const { unreadCount } = useSupportChat();

  const handleOpenConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setCurrentView("chat");
  };

  const handleNewConversation = () => {
    setCurrentView("new");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedConversationId(null);
  };

  const handleConversationCreated = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setCurrentView("chat");
  };

  const getTitle = () => {
    switch (currentView) {
      case "list":
        return "Suporte TôLivre";
      case "chat":
        return "Conversa";
      case "new":
        return "Nova Conversa";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 flex flex-col bg-background border sm:rounded-lg shadow-2xl sm:w-96 w-full sm:h-[600px] h-full animate-in slide-in-from-bottom-5 sm:slide-in-from-bottom-5">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-primary text-primary-foreground sm:rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">{getTitle()}</h3>
          {currentView === "list" && unreadCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 hidden sm:flex"
            onClick={onClose}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden">
        {currentView === "list" && (
          <ConversationList
            onOpenConversation={handleOpenConversation}
            onNewConversation={handleNewConversation}
          />
        )}
        {currentView === "chat" && selectedConversationId && (
          <ConversationView
            conversationId={selectedConversationId}
            onBack={handleBackToList}
          />
        )}
        {currentView === "new" && (
          <NewConversationForm
            onBack={handleBackToList}
            onConversationCreated={handleConversationCreated}
          />
        )}
      </div>
    </div>
  );
}
