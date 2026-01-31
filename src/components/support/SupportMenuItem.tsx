"use client";

import { useState } from "react";
import { IconMessageCircle } from "@tabler/icons-react";
import { SupportChatWidget } from "./SupportChatWidget";

export function SupportMenuItem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 w-full text-left"
      >
        <IconMessageCircle />
        <span>Suporte</span>
      </button>

      <SupportChatWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default SupportMenuItem;
