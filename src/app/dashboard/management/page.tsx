"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import useSession from "@/hooks/useSession";
import { Loader2, MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ManagementMetricsResponse } from "@/app/api/dashboard/management/metrics/route";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell, Legend } from "recharts";

// Helper para verificar se é usuário interno do ToLivre
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

const timelineOptions = [
  { label: "7 dias", value: "7d" },
  { label: "30 dias", value: "30d" },
  { label: "90 dias", value: "90d" },
] as const;

const descriptions: Record<string, string> = {
  "7d": "Volatilidade curta mostra confirmações e reagendamentos recentes.",
  "30d": "Visão padrão usada pelo time comercial do TôLivre.",
  "90d": "Ideal para analisar o ciclo completo de campanhas e sazonalidade.",
};

const numberFormatter = new Intl.NumberFormat("pt-BR");
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const preciseCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type TimelineRange = (typeof timelineOptions)[number]["value"];

type UazapiConnectionState = {
  connected: boolean;
  instanceId?: string | null;
  profileName?: string | null;
  message?: string | null;
  qrCode?: string | null;
  instanceToken?: string | null;
};

const formatCurrency = (value: number, perDay = false) => {
  const formatted = preciseCurrencyFormatter.format(value);
  return perDay ? `${formatted}/dia` : formatted;
};

const formatCompactCurrency = (value: number) =>
  currencyFormatter.format(value);
const formatNumber = (value: number) => numberFormatter.format(value);

export default function ManagementDashboardPage() {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();

  // Verificação de autorização - apenas staff interno do ToLivre
  useEffect(() => {
    if (!sessionLoading && !isToLivreStaff(user?.email)) {
      router.push("/dashboard");
    }
  }, [user?.email, sessionLoading, router]);

  const [range, setRange] = useState<TimelineRange>("30d");
  const [metrics, setMetrics] = useState<ManagementMetricsResponse | null>(
    null,
  );
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [metricsError, setMetricsError] = useState<string | null>(null);
  const [connectionState, setConnectionState] =
    useState<UazapiConnectionState | null>(null);
  const [connectionLoading, setConnectionLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [initLoading, setInitLoading] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [disconnectLoading, setDisconnectLoading] = useState(false);
  const [disconnectError, setDisconnectError] = useState<string | null>(null);
  const [disconnectResult, setDisconnectResult] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteResult, setDeleteResult] = useState<string | null>(null);
  const [previewPhone, setPreviewPhone] = useState("");
  const [previewMessage, setPreviewMessage] = useState(
    "Teste pelo painel oficial do TôLivre.",
  );
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewResult, setPreviewResult] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const companyId = user?.companyId;

  const rangeDescription = useMemo(() => descriptions[range], [range]);
  const rangeLabel = useMemo(
    () =>
      timelineOptions.find((option) => option.value === range)?.label ??
      "30 dias",
    [range],
  );

  const fetchMetrics = useCallback(async () => {
    setMetricsLoading(true);
    setMetricsError(null);

    try {
      const response = await fetch(
        `/api/dashboard/management/metrics?range=${range}`,
        {
          cache: "no-store",
        },
      );
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error ?? "Falha ao carregar métricas");
      }

      setMetrics(payload.data as ManagementMetricsResponse);
    } catch (error) {
      console.error("[management-metrics] fetch error", error);
      setMetricsError(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar as métricas",
      );
    } finally {
      setMetricsLoading(false);
    }
  }, [range]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    setPolling(false);
  }, []);

  const fetchConnectionStatus = useCallback(async () => {
    if (!companyId) return;
    setConnectionLoading(true);
    setConnectionError(null);

    try {
      const params = new URLSearchParams({ companyId });
      const response = await fetch(
        `/api/integrations/uazapi/status?${params.toString()}`,
        {
          cache: "no-store",
        },
      );
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(
          payload?.error ?? "Não foi possível verificar o WhatsApp oficial",
        );
      }

      setConnectionState((previous) => ({
        connected: payload.data.connected,
        instanceId: payload.data.instanceId,
        profileName: payload.data.profileName,
        message:
          payload.data.message ||
          (payload.data.connected
            ? "WhatsApp conectado"
            : (previous?.message ?? "")),
        qrCode:
          payload.data.connected || payload.data.qrCode
            ? payload.data.connected
              ? null
              : payload.data.qrCode
            : (previous?.qrCode ?? null),
        instanceToken:
          payload.data.instanceToken ?? previous?.instanceToken ?? null,
      }));

      if (payload.data.connected) {
        stopPolling();
      }
    } catch (error) {
      console.error("[uazapi-status] fetch error", error);
      setConnectionError(
        error instanceof Error
          ? error.message
          : "Erro ao verificar o WhatsApp oficial",
      );
    } finally {
      setConnectionLoading(false);
    }
  }, [companyId, stopPolling]);

  const startPolling = useCallback(() => {
    if (!companyId) return;
    stopPolling();
    setPolling(true);
    fetchConnectionStatus();

    pollingRef.current = setInterval(() => {
      fetchConnectionStatus();
    }, 3000);

    setTimeout(
      () => {
        stopPolling();
      },
      5 * 60 * 1000,
    );
  }, [companyId, fetchConnectionStatus, stopPolling]);

  const handleUazapiInit = useCallback(async () => {
    if (!companyId) {
      setInitError("Empresa não identificada");
      return;
    }

    setInitLoading(true);
    setInitError(null);

    try {
      const instanceName = `tolivre-${companyId}`;
      const webhookUrl = `${window.location.origin}/api/webhooks/uazapi`;

      const response = await fetch("/api/integrations/uazapi/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instanceName,
          webhookUrl,
          qrcode: true,
          webhook_wa_business: false,
          companyId,
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(
          payload?.error ?? "Erro ao inicializar o WhatsApp oficial",
        );
      }

      setConnectionState({
        connected: false,
        instanceId: payload.data.instanceId,
        profileName: payload.data.profileName,
        message:
          payload.data.message ||
          "QR Code gerado! Escaneie com o WhatsApp oficial.",
        qrCode: payload.data.qrCode,
        instanceToken: payload.data.instanceToken,
      });

      startPolling();
    } catch (error) {
      console.error("[uazapi-init] error", error);
      setInitError(
        error instanceof Error
          ? error.message
          : "Erro ao conectar o WhatsApp oficial",
      );
    } finally {
      setInitLoading(false);
    }
  }, [companyId, startPolling]);

  const handleSendPreview = useCallback(async () => {
    if (!previewPhone || !previewMessage) {
      setPreviewError("Informe telefone e mensagem para enviar o teste.");
      return;
    }

    setPreviewLoading(true);
    setPreviewError(null);
    setPreviewResult(null);

    try {
      const response = await fetch("/api/dashboard/management/uazapi/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: previewPhone,
          message: previewMessage,
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error ?? "Falha ao enviar mensagem de teste");
      }

      setPreviewResult("Mensagem enviada com sucesso!");
    } catch (error) {
      console.error("[management/messaging] send error", error);
      setPreviewError(
        error instanceof Error ? error.message : "Erro ao enviar mensagem",
      );
    } finally {
      setPreviewLoading(false);
    }
  }, [previewMessage, previewPhone]);

  const handleDisconnect = useCallback(async () => {
    const shouldContinue = window.confirm(
      "Deseja desconectar a instância do WhatsApp oficial?",
    );
    if (!shouldContinue) return;

    setDisconnectLoading(true);
    setDisconnectError(null);
    setDisconnectResult(null);

    try {
      const response = await fetch(
        "/api/dashboard/management/uazapi/disconnect",
        {
          method: "POST",
        },
      );
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(
          payload?.error ?? "Não foi possível desconectar a instância",
        );
      }

      setConnectionState((previous) => ({
        connected: false,
        instanceId: previous?.instanceId ?? null,
        profileName: previous?.profileName ?? null,
        message: "WhatsApp desconectado",
        qrCode: null,
        instanceToken: previous?.instanceToken ?? null,
      }));
      setDisconnectResult("Instância desconectada com sucesso.");
    } catch (error) {
      console.error("[uazapi-disconnect] error", error);
      setDisconnectError(
        error instanceof Error
          ? error.message
          : "Erro ao desconectar instância",
      );
    } finally {
      setDisconnectLoading(false);
    }
  }, []);

  const handleDeleteInstance = useCallback(async () => {
    const shouldContinue = window.confirm(
      "Deseja excluir a instância do WhatsApp oficial? Essa ação é irreversível.",
    );
    if (!shouldContinue) return;

    setDeleteLoading(true);
    setDeleteError(null);
    setDeleteResult(null);

    try {
      const response = await fetch("/api/dashboard/management/uazapi/delete", {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(
          payload?.error ?? "Não foi possível excluir a instância",
        );
      }

      setConnectionState({
        connected: false,
        instanceId: null,
        profileName: null,
        message: "Instância excluída",
        qrCode: null,
        instanceToken: null,
      });
      setDeleteResult("Instância excluída. Será necessário reconectar.");
    } catch (error) {
      console.error("[uazapi-delete] error", error);
      setDeleteError(
        error instanceof Error ? error.message : "Erro ao excluir instância",
      );
    } finally {
      setDeleteLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  useEffect(() => {
    fetchConnectionStatus();
    return () => stopPolling();
  }, [fetchConnectionStatus, stopPolling]);

  const kpiItems = useMemo(() => {
    const summary = metrics?.summary;

    return [
      {
        title: "Agendamentos",
        value: summary ? formatNumber(summary.appointmentVolume) : "—",
        detail: summary
          ? `${formatNumber(summary.appointmentVolume)} agendamentos nos últimos ${rangeLabel}`
          : "Carregando dados oficiais...",
      },
      {
        title: "Faturamento projetado",
        value: summary ? formatCurrency(summary.revenueRunRate, true) : "—",
        detail: summary
          ? `${formatCompactCurrency(summary.revenue)} registrados no período`
          : "Atualizando receita...",
      },
      {
        title: "Profissionais ativos",
        value: summary ? formatNumber(summary.activeProfessionals) : "—",
        detail: summary
          ? `Profissionais com confirmação nas últimas ${rangeLabel}`
          : "Carregando força de trabalho...",
      },
      {
        title: "Nota média",
        value: summary?.averageRating
          ? `${summary.averageRating.toFixed(1)}/5`
          : "—",
        detail: summary?.averageRating
          ? "Baseada em avaliações públicas"
          : "Ainda sem avaliações públicas",
      },
    ];
  }, [metrics, rangeLabel]);

  const distribution = metrics?.distribution ?? {
    confirmed: 0,
    rescheduled: 0,
    canceled: 0,
  };

  const statusLabel = connectionState?.connected ? "Conectado" : "Desconectado";
  const statusVariant = connectionState?.connected ? "secondary" : "outline";
  const connectionMessage =
    connectionState?.message ??
    "Conecte o canal oficial para enviar confirmações e lembretes do TôLivre.";

  // Tela de loading durante verificação de autorização
  if (sessionLoading || !isToLivreStaff(user?.email)) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          {sessionLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p>Verificando autorização...</p>
            </div>
          ) : null}
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col gap-6 px-4 py-8">
        <div className="container mx-auto max-w-6xl space-y-6">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              <Sparkles className="h-5 w-5" aria-hidden />
              Gestão TôLivre
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Painel de métricas oficiais
              </h1>
              <p className="text-base text-muted-foreground">
                Acompanhe receita, profissionais ativos, satisfação e o volume
                de agendamentos do TôLivre em um único lugar. O WhatsApp oficial
                (via Uazapi) dispara confirmações, lembretes e alertas com o
                mesmo idioma da empresa.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" asChild>
                <Link href="#whatsapp">Abrir painel do WhatsApp oficial</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/security/2fa">
                  Reforçar autenticação
                </Link>
              </Button>
            </div>
          </header>

          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
            <span className="text-base font-semibold text-foreground">
              Período:
            </span>
            <div className="flex gap-2">
              {timelineOptions.map((option) => (
                <Button
                  key={option.value}
                  size="sm"
                  variant={range === option.value ? "secondary" : "ghost"}
                  onClick={() => setRange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <span className="text-xs uppercase tracking-[0.3em]">
              {rangeDescription}
            </span>
            {metricsLoading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Atualizando métricas oficiais...
              </div>
            )}
          </div>
          {metricsError && (
            <p className="text-xs text-destructive">{metricsError}</p>
          )}

          <div className="grid gap-4 md:grid-cols-4">
            {kpiItems.map((item) => (
              <Card key={item.title} className="border">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold text-foreground">
                    {item.value}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">
                  {item.detail}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border">
            <CardHeader className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Distribuição de status</CardTitle>
                <CardDescription>
                  O gráfico mostra como os status de agendamento se comportaram
                  nos últimos {rangeLabel}. Os dados são reavaliados sempre que
                  o período muda.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-emerald-500" aria-hidden />
                Tendência positiva (meta 92% de comparecimento)
              </div>
            </CardHeader>
            <CardContent>
              {metrics && (
                <ChartContainer
                  config={{
                    confirmados: {
                      label: "Confirmados",
                      color: "hsl(142, 76%, 36%)",
                    },
                    reagendamentos: {
                      label: "Reagendamentos",
                      color: "hsl(38, 92%, 50%)",
                    },
                    cancelamentos: {
                      label: "Cancelamentos",
                      color: "hsl(0, 84%, 60%)",
                    },
                  }}
                  className="mx-auto h-56 w-full max-w-md"
                >
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={[
                        {
                          name: "Confirmados",
                          value: distribution.confirmed,
                          fill: "var(--color-confirmados)",
                        },
                        {
                          name: "Reagendamentos",
                          value: distribution.rescheduled,
                          fill: "var(--color-reagendamentos)",
                        },
                        {
                          name: "Cancelamentos",
                          value: distribution.canceled,
                          fill: "var(--color-cancelamentos)",
                        },
                      ].filter((item) => item.value > 0)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    />
                  </PieChart>
                </ChartContainer>
              )}
              {!metrics && (
                <div className="h-56 w-full rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent" />
              )}
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  {
                    label: "Confirmados",
                    value: distribution.confirmed,
                    hint: "CONFIRMED + COMPLETED",
                    tone: "text-emerald-500",
                  },
                  {
                    label: "Reagendamentos",
                    value: distribution.rescheduled,
                    hint: "PENDING",
                    tone: "text-amber-500",
                  },
                  {
                    label: "Cancelamentos",
                    value: distribution.canceled,
                    hint: "CANCELED",
                    tone: "text-red-500",
                  },
                ].map((item) => (
                  <div key={item.label} className="space-y-1 text-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p
                      className={`text-lg font-semibold text-foreground ${item.tone}`}
                    >
                      {formatNumber(item.value)}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.hint}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card id="whatsapp" className="border">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" aria-hidden />
                <div>
                  <CardTitle>WhatsApp oficial (Uazapi)</CardTitle>
                  <CardDescription>
                    O painel usa api/integrations/uazapi/status para mostrar se
                    o canal oficial está conectado.
                  </CardDescription>
                </div>
              </div>
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {connectionMessage}
              </p>
              {connectionState?.profileName && (
                <p className="text-xs text-muted-foreground">
                  Perfil ativo: {connectionState.profileName}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={fetchConnectionStatus}
                  disabled={connectionLoading}
                >
                  {connectionLoading
                    ? "Atualizando status..."
                    : "Atualizar status"}
                </Button>
                <Button size="sm" asChild>
                  <a
                    href="https://free.uazapi.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Documentação Uazapi
                  </a>
                </Button>
                {!connectionState?.connected && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleUazapiInit}
                    disabled={initLoading}
                  >
                    {initLoading
                      ? "Gerando instância..."
                      : "Conectar WhatsApp oficial"}
                  </Button>
                )}
                {(connectionState?.connected ||
                  connectionState?.instanceToken) && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDisconnect}
                    disabled={disconnectLoading}
                  >
                    {disconnectLoading
                      ? "Desconectando..."
                      : "Desconectar instância"}
                  </Button>
                )}
                {connectionState?.instanceToken && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDeleteInstance}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? "Excluindo..." : "Excluir instância"}
                  </Button>
                )}
              </div>
              {connectionError && (
                <p className="text-xs text-destructive">{connectionError}</p>
              )}
              {initError && (
                <p className="text-xs text-destructive">{initError}</p>
              )}
              {disconnectError && (
                <p className="text-xs text-destructive">{disconnectError}</p>
              )}
              {disconnectResult && (
                <p className="text-xs text-foreground">{disconnectResult}</p>
              )}
              {deleteError && (
                <p className="text-xs text-destructive">{deleteError}</p>
              )}
              {deleteResult && (
                <p className="text-xs text-foreground">{deleteResult}</p>
              )}
              {connectionState?.connected ? (
                <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Canal conectado
                  </p>
                  <p className="text-sm text-foreground">
                    {connectionState.profileName
                      ? `Ativo como ${connectionState.profileName}`
                      : "Canal oficial ativo"}
                  </p>
                  <div className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label>Telefone de teste</Label>
                        <Input
                          value={previewPhone}
                          onChange={(event) =>
                            setPreviewPhone(event.target.value)
                          }
                          placeholder="5511999999999"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <Label>Mensagem de teste</Label>
                        <Textarea
                          value={previewMessage}
                          onChange={(event) =>
                            setPreviewMessage(event.target.value)
                          }
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        onClick={handleSendPreview}
                        disabled={previewLoading || !previewPhone}
                        size="sm"
                      >
                        {previewLoading
                          ? "Enviando..."
                          : "Enviar mensagem de teste"}
                      </Button>
                      {previewResult && (
                        <p className="text-xs text-foreground">
                          {previewResult}
                        </p>
                      )}
                      {previewError && (
                        <p className="text-xs text-destructive">
                          {previewError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : connectionState?.qrCode ? (
                <div className="rounded-2xl border border-dashed border-primary/50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    QR Code de conexão
                  </p>
                  <div className="mt-3 flex justify-center">
                    <img
                      src={connectionState.qrCode}
                      alt="QR Code para conectar o WhatsApp oficial"
                      className="h-40 w-40 rounded-lg border border-slate-200"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Escaneie pelo WhatsApp → Configurações → Dispositivos
                    conectados.
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
