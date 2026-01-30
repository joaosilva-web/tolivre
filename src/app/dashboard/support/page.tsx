"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaffConversationList } from "@/components/support/StaffConversationList";
import { StaffConversationView } from "@/components/support/StaffConversationView";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type TabValue = "OPEN" | "IN_PROGRESS" | "CLOSED";

export default function SupportPage() {
  const { user, loading } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabValue>("OPEN");
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  // Verificar se é staff
  useEffect(() => {
    if (!loading && user && !user.email?.endsWith("@tolivre.app")) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !user.email?.endsWith("@tolivre.app")) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <h1 className="text-2xl font-bold mb-4">Suporte TôLivre</h1>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabValue)}
        >
          <TabsList>
            <TabsTrigger value="OPEN">Abertas</TabsTrigger>
            <TabsTrigger value="IN_PROGRESS">Em Andamento</TabsTrigger>
            <TabsTrigger value="CLOSED">Fechadas</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden">
        {/* Lista de Conversas */}
        <div className="border-r overflow-hidden">
          <StaffConversationList
            status={activeTab}
            selectedId={selectedConversationId}
            onSelect={setSelectedConversationId}
          />
        </div>

        {/* Conversa Selecionada */}
        <div className="col-span-2 overflow-hidden">
          {selectedConversationId ? (
            <StaffConversationView
              conversationId={selectedConversationId}
              onBack={() => setSelectedConversationId(null)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <p className="text-lg mb-2">Selecione uma conversa</p>
                <p className="text-sm">
                  Escolha uma conversa na lista para visualizar e responder
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
