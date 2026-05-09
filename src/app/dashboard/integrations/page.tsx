"use client";

import { useEffect, useRef, useState } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  QrCode,
  RefreshCw,
  Smartphone,
  Wifi,
  WifiOff,
} from "lucide-react";
import useSession from "@/hooks/useSession";
import { toast } from "sonner";

type ConnectionStatus = "idle" | "loading" | "qr" | "connected" | "error";

interface StatusData {
  connected: boolean;
  instanceName: string | null;
  profileName: string | null;
  state?: string;
}

export default function IntegrationsPage() {
  const { user } = useSession();
  const companyId = user?.companyId;

  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [instanceName, setInstanceName] = useState("");
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isRefreshingQR, setIsRefreshingQR] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Busca status inicial
  useEffect(() => {
    if (!companyId) return;
    checkStatus();
    return () => stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  function startPolling() {
    stopPolling();
    pollRef.current = setInterval(async () => {
      const data = await fetchStatus();
      if (data?.connected) {
        setStatus("connected");
        setStatusData(data);
        setQrCode(null);
        stopPolling();
        toast.success("WhatsApp conectado com sucesso!");
      }
    }, 5000);
  }

  async function fetchStatus(): Promise<StatusData | null> {
    if (!companyId) return null;
    try {
      const res = await fetch(
        `/api/integrations/uazapi/status?companyId=${companyId}`,
      );
      if (!res.ok) return null;
      const json = await res.json();
      return json.data ?? null;
    } catch {
      return null;
    }
  }

  async function checkStatus() {
    setStatus("loading");
    const data = await fetchStatus();
    if (!data) {
      setStatus("idle");
      return;
    }
    setStatusData(data);
    if (data.connected) {
      setStatus("connected");
    } else if (data.instanceName) {
      // Instância existe mas não conectada: buscar QR code
      await refreshQRCode(data.instanceName);
    } else {
      setStatus("idle");
    }
  }

  async function refreshQRCode(name?: string) {
    const targetInstance = name || statusData?.instanceName;
    if (!targetInstance || !companyId) return;

    setIsRefreshingQR(true);
    try {
      const res = await fetch(`/api/integrations/uazapi/init?companyId=${companyId}&token=${encodeURIComponent(targetInstance)}`);
      if (res.ok) {
        // O GET do init retorna status; se ainda não conectado, buscar QR direto
        const statusRes = await fetch(`/api/integrations/uazapi/status?companyId=${companyId}`);
        const statusJson = await statusRes.json();
        const d = statusJson?.data;
        if (d?.connected) {
          setStatus("connected");
          setStatusData(d);
          setQrCode(null);
          return;
        }
      }

      // Re-criar instância para obter novo QR
      const createRes = await fetch("/api/integrations/uazapi/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instanceName: targetInstance, companyId }),
      });
      const createJson = await createRes.json();
      if (createJson?.data?.qrCode) {
        setQrCode(createJson.data.qrCode);
        setStatus("qr");
        startPolling();
      }
    } catch {
      toast.error("Erro ao atualizar QR code");
    } finally {
      setIsRefreshingQR(false);
    }
  }

  async function handleConnect() {
    if (!companyId) return;
    const name = instanceName.trim() || `empresa-${companyId.slice(0, 8)}`;
    setStatus("loading");
    try {
      const res = await fetch("/api/integrations/uazapi/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instanceName: name, companyId }),
      });
      const json = await res.json();

      if (!res.ok) {
        toast.error(json?.error || "Erro ao criar instância");
        setStatus("idle");
        return;
      }

      const qr = json?.data?.qrCode;
      if (qr) {
        setQrCode(qr);
        setStatus("qr");
        setStatusData({ connected: false, instanceName: name, profileName: null });
        startPolling();
      } else {
        toast.error("QR code não disponível. Tente novamente.");
        setStatus("idle");
      }
    } catch {
      toast.error("Erro ao conectar WhatsApp");
      setStatus("idle");
    }
  }

  async function handleDisconnect() {
    if (!companyId) return;
    setIsDisconnecting(true);
    stopPolling();
    try {
      await fetch("/api/integrations/uazapi/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId }),
      });
      setStatus("idle");
      setStatusData(null);
      setQrCode(null);
      setInstanceName("");
      toast.success("WhatsApp desconectado");
    } catch {
      toast.error("Erro ao desconectar");
    } finally {
      setIsDisconnecting(false);
    }
  }

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col gap-6 px-4 py-8">
        <div className="container mx-auto max-w-2xl space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Integrações</h1>
            <p className="text-sm text-muted-foreground">
              Conecte o WhatsApp da sua empresa para enviar confirmações e
              lembretes de agendamentos diretamente pelo seu número.
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">WhatsApp</CardTitle>
                    <CardDescription className="text-xs">
                      Envie mensagens pelo número da sua empresa
                    </CardDescription>
                  </div>
                </div>
                <ConnectionBadge status={status} />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Estado: conectado */}
              {status === "connected" && statusData && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                    <div className="text-sm">
                      <span className="font-medium text-green-700 dark:text-green-300">
                        Conectado
                      </span>
                      {statusData.profileName && (
                        <span className="text-green-600 dark:text-green-400">
                          {" "}— {statusData.profileName}
                        </span>
                      )}
                    </div>
                  </div>

                  {statusData.instanceName && (
                    <p className="text-xs text-muted-foreground">
                      Instância:{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-xs">
                        {statusData.instanceName}
                      </code>
                    </p>
                  )}

                  <Separator />

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDisconnect}
                    disabled={isDisconnecting}
                  >
                    {isDisconnecting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Desconectar WhatsApp
                  </Button>
                </div>
              )}

              {/* Estado: aguardando QR code */}
              {status === "qr" && (
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription className="text-sm">
                      Abra o WhatsApp no celular → toque em{" "}
                      <strong>Dispositivos conectados</strong> →{" "}
                      <strong>Conectar dispositivo</strong> → escaneie o QR
                      code abaixo.
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col items-center gap-3">
                    {qrCode ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={qrCode}
                        alt="QR code para conectar WhatsApp"
                        className="h-56 w-56 rounded-lg border"
                      />
                    ) : (
                      <div className="flex h-56 w-56 items-center justify-center rounded-lg border bg-muted">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Aguardando conexão...
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refreshQRCode()}
                      disabled={isRefreshingQR}
                    >
                      {isRefreshingQR ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Atualizar QR code
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        stopPolling();
                        setStatus("idle");
                        setQrCode(null);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {/* Estado: loading */}
              {status === "loading" && (
                <div className="flex items-center gap-3 py-4 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verificando conexão...
                </div>
              )}

              {/* Estado: idle (não conectado) */}
              {status === "idle" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
                    <WifiOff className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Nenhum número conectado. Conecte o WhatsApp para enviar
                      confirmações e lembretes.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instanceName" className="text-sm">
                      Nome da instância{" "}
                      <span className="text-muted-foreground">(opcional)</span>
                    </Label>
                    <Input
                      id="instanceName"
                      placeholder={`empresa-${companyId?.slice(0, 8) || "xxxx"}`}
                      value={instanceName}
                      onChange={(e) => setInstanceName(e.target.value)}
                      className="max-w-xs font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Identificador único para esta conexão. Use apenas letras,
                      números e hífens.
                    </p>
                  </div>

                  <Button onClick={handleConnect} className="gap-2">
                    <QrCode className="h-4 w-4" />
                    Conectar WhatsApp
                  </Button>
                </div>
              )}

              {/* Estado: erro */}
              {status === "error" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950">
                    <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Erro ao verificar conexão.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={checkStatus}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Tentar novamente
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informações sobre o funcionamento */}
          {status === "connected" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">O que é enviado automaticamente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Wifi className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Confirmação de agendamento ao criar um novo horário</span>
                </div>
                <div className="flex items-start gap-2">
                  <Wifi className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Lembrete automático antes do horário marcado</span>
                </div>
                <div className="flex items-start gap-2">
                  <Wifi className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Link de reagendamento quando o cliente solicitar</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}

function ConnectionBadge({ status }: { status: ConnectionStatus }) {
  if (status === "connected") {
    return (
      <Badge variant="outline" className="border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        Conectado
      </Badge>
    );
  }
  if (status === "qr") {
    return (
      <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
        Aguardando scan
      </Badge>
    );
  }
  if (status === "loading") {
    return (
      <Badge variant="outline">
        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
        Carregando
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-muted-foreground">
      <WifiOff className="mr-1 h-3 w-3" />
      Desconectado
    </Badge>
  );
}
