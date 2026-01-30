"use client";

import { useState } from "react";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSupportChat } from "@/hooks/useSupportChat";

interface NewConversationFormProps {
  onBack: () => void;
  onConversationCreated: (conversationId: string) => void;
}

export function NewConversationForm({
  onBack,
  onConversationCreated,
}: NewConversationFormProps) {
  const { createConversation } = useSupportChat();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      setError("Preencha todos os campos");
      return;
    }

    if (subject.length < 3 || subject.length > 200) {
      setError("O assunto deve ter entre 3 e 200 caracteres");
      return;
    }

    if (message.length > 1000) {
      setError("A mensagem deve ter no máximo 1000 caracteres");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const conversationId = await createConversation(
        subject.trim(),
        message.trim(),
      );
      if (conversationId) {
        onConversationCreated(conversationId);
      } else {
        setError("Erro ao criar conversa. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao criar conversa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h4 className="font-medium text-sm">Iniciar Nova Conversa</h4>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <Label htmlFor="subject">Assunto *</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Dúvida sobre agendamentos"
              maxLength={200}
              disabled={loading}
              required
            />
            <p className="text-xs text-muted-foreground">
              {subject.length}/200 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Descreva sua dúvida ou problema..."
              className="min-h-[150px] resize-none"
              maxLength={1000}
              disabled={loading}
              required
            />
            <p className="text-xs text-muted-foreground">
              {message.length}/1000 caracteres
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Footer com botão de envio */}
        <div className="pt-4 border-t mt-4">
          <Button
            type="submit"
            disabled={loading || !subject.trim() || !message.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Criando conversa...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Enviar
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
