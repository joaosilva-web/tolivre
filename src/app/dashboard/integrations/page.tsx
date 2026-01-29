"use client";

import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

const highlights = [
  {
    title: "Fluxo 100% automatizado",
    description:
      "O WhatsApp oficial do TôLivre trafega confirmações, lembretes e alertas sem que você precise conectar seu número pessoal.",
  },
  {
    title: "Mensagens confiáveis",
    description:
      "Garantimos títulos claros e horários precisos para reduzir ausências, com textos padronizados e respeitando a identidade da sua marca.",
  },
  {
    title: "Escalonamento seguro",
    description:
      "Faltas, reagendamentos e lembretes são enviados mesmo quando o seu celular estiver desligado, pois tudo passa pelo servidor oficial.",
  },
];

const automationPoints = [
  "Confirmações automáticas assim que o cliente agenda pelo site ou pelo WhatsApp oficial.",
  "Lembretes 48h e 1h antes do atendimento, mantendo o cliente informado sobre o horário.",
  "Alertas por reagendamento ou cancelamento chegam sempre pelo mesmo número confiável.",
];

export default function IntegrationsPage() {
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col gap-6 px-4 py-8">
        <div className="container mx-auto max-w-5xl space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-5 w-5" aria-hidden />
              Canal oficial do TôLivre
            </div>
            <div>
              <h1 className="text-3xl font-bold">Integrações</h1>
              <p className="text-base text-muted-foreground">
                A única integração necessária é com o WhatsApp oficial do TôLivre. Enviamos todas as mensagens de confirmação, lembrete e
                reagendamento por lá, sem exigir que você configure ou mantenha um número próprio conectado.
              </p>
            </div>
          </div>

          <Alert>
            <AlertDescription>
              Todas as notificações saem do mesmo número verificado pelo TôLivre, garantindo consistência e evitando bloqueios por uso indevido.
              Caso precise de um atendimento personalizado, abra o chat do suporte disponível dentro do painel.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.title} className="border">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Automação</p>
                  <p className="mt-1 text-sm text-foreground">Nenhuma configuração extra.</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border">
            <CardHeader className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" aria-hidden />
              <div>
                <CardTitle>O que acontece por trás</CardTitle>
                <CardDescription>
                  A automação roda no servidor do TôLivre e respeita o idioma e horário da sua empresa.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {automationPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
                    <p className="text-sm text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:suporte@tolivre.com">Falar com o time do TôLivre</a>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard">Voltar ao dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
