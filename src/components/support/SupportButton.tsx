"use client";

import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SupportChatWidget } from "./SupportChatWidget";
import { useSupportChat } from "@/hooks/useSupportChat";

export function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useSupportChat();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative"
        title="Suporte"
      >
        <MessageCircleQuestion className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      <SupportChatWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
