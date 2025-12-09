"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import useSession from "@/hooks/useSession";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gsap } from "gsap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  CheckCircle,
  XCircle,
  ExternalLink,
  MessageCircle,
  Smartphone,
  Globe,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function IntegrationsPage() {
  const { user } = useSession();

  // Uazapi Integration State
  const [uazapiLoading, setUazapiLoading] = useState(false);
  const [uazapiStatus, setUazapiStatus] = useState<{
    connected: boolean;
    instanceId?: string;
    instanceToken?: string;
    qrCode?: string;
    message?: string;
    profileName?: string;
    status?: string;
  }>({ connected: false });
  const [error, setError] = useState("");
  const [polling, setPolling] = useState(false);
  const pollingIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Function to check connection status
  const checkConnectionStatus = useCallback(
    async (token: string) => {
      if (!user?.companyId || !token) return;

      try {
        const response = await fetch(
          `/api/integrations/uazapi/init?token=${encodeURIComponent(
            token
          )}&companyId=${user.companyId}`
        );
        const result = await response.json();

        if (result.success && result.data.connected) {
          // Connected! Stop polling and update status
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          setPolling(false);

          setUazapiStatus((prev) => ({
            ...prev,
            connected: true,
            qrCode: undefined, // Remove QR code
            profileName: result.data.profileName,
            status: result.data.status,
            message: `WhatsApp conectado! ${
              result.data.profileName
                ? `Perfil: ${result.data.profileName}`
                : ""
            }`,
          }));
        }
      } catch (err) {
        console.error("Erro ao verificar status de conexão:", err);
      }
    },
    [user?.companyId]
  );

  // Start polling when QR code is displayed
  const startPolling = useCallback(
    (token: string) => {
      // Clear any existing interval
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }

      setPolling(true);

      // Check immediately
      checkConnectionStatus(token);

      // Then check every 3 seconds
      pollingIntervalRef.current = setInterval(() => {
        checkConnectionStatus(token);
      }, 3000);

      // Stop polling after 5 minutes (QR code expires)
      setTimeout(() => {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
          setPolling(false);
        }
      }, 5 * 60 * 1000);
    },
    [checkConnectionStatus]
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const handleUazapiInit = useCallback(async () => {
    if (!user?.companyId) {
      setError("Erro: Empresa não identificada");
      return;
    }

    setUazapiLoading(true);
    setError("");

    try {
      // Gera instanceName automaticamente: tolivre-{companyId}
      const instanceName = `tolivre-${user.companyId}`;
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
          companyId: user.companyId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const instanceToken = result.data.instanceToken;

        setUazapiStatus({
          connected: false,
          instanceId: result.data.instanceId,
          instanceToken: instanceToken,
          qrCode: result.data.qrCode,
          message: result.data.qrCode
            ? "QR Code gerado! Escaneie com seu WhatsApp para conectar."
            : "Instância criada, mas QR Code não foi retornado. Verifique os logs.",
        });

        // Start polling to check connection status
        if (instanceToken && result.data.qrCode) {
          startPolling(instanceToken);
        }

        console.log("[integrations-page] Instância criada:", instanceName);
      } else {
        setError(result.error || "Erro ao criar instância");
      }
    } catch (err) {
      console.error("Erro ao conectar com Uazapi:", err);
      setError("Erro de conexão. Verifique suas configurações.");
    } finally {
      setUazapiLoading(false);
    }
  }, [user?.companyId, startPolling]);

  const checkUazapiStatus = useCallback(async () => {
    if (!user?.companyId) return;

    try {
      const response = await fetch(
        `/api/integrations/uazapi/status?companyId=${user.companyId}`
      );
      const result = await response.json();

      if (result.success && result.data) {
        setUazapiStatus({
          connected: result.data.connected,
          instanceId: result.data.instanceId,
          message: result.data.message,
        });
      }
    } catch (err) {
      console.error("Erro ao verificar status:", err);
    }
  }, [user?.companyId]);

  // Check status on component mount
  React.useEffect(() => {
    checkUazapiStatus();
  }, [checkUazapiStatus]);

  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(tabsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [user]);

  if (!user) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
          <div className="max-w-4xl mx-auto">
            <div ref={headerRef} className="mb-6">
              <h1 className="text-2xl font-bold">Integrações</h1>
              <p className="text-muted-foreground">
                Configure suas integrações para automatizar processos e melhorar
                a comunicação com clientes.
              </p>
            </div>

            <Tabs ref={tabsRef} defaultValue="uazapi" className="w-full">
              <TabsList className="grid w-full grid-cols-1 max-w-md">
                <TabsTrigger value="uazapi" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp (Uazapi)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="uazapi" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Integração WhatsApp - Uazapi
                      {uazapiStatus.connected && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </CardTitle>
                    <CardDescription>
                      Configure a integração com WhatsApp para envio automático
                      de notificações de agendamentos.
                      <a
                        href="https://docs.uazapi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 ml-2 text-primary hover:underline"
                      >
                        Ver documentação <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {uazapiStatus.message && (
                      <Alert
                        variant={uazapiStatus.connected ? "default" : "default"}
                      >
                        {uazapiStatus.connected ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <MessageCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>
                          {uazapiStatus.message}
                        </AlertDescription>
                      </Alert>
                    )}

                    {uazapiStatus.connected ? (
                      <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-green-900 dark:text-green-100">
                              Status: Ativo
                            </span>
                          </div>
                          {uazapiStatus.profileName && (
                            <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                              Perfil conectado: {uazapiStatus.profileName}
                            </p>
                          )}
                        </div>

                        {uazapiStatus.instanceId && (
                          <p className="text-sm text-muted-foreground">
                            ID da Instância: {uazapiStatus.instanceId}
                          </p>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (uazapiStatus.instanceToken) {
                                checkConnectionStatus(
                                  uazapiStatus.instanceToken
                                );
                              }
                            }}
                          >
                            <Smartphone className="h-4 w-4 mr-2" />
                            Verificar Status
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (pollingIntervalRef.current) {
                                clearInterval(pollingIntervalRef.current);
                                pollingIntervalRef.current = null;
                              }
                              setPolling(false);
                              setUazapiStatus({ connected: false });
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Desconectar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-start gap-3">
                            <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                                Conectar WhatsApp
                              </h4>
                              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                                Clique no botão abaixo para gerar o QR Code.
                                Após escanear com seu WhatsApp, a conexão será
                                estabelecida automaticamente.
                              </p>
                            </div>
                          </div>
                        </div>

                        {error && (
                          <Alert variant="destructive">
                            <XCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        <Button
                          onClick={handleUazapiInit}
                          disabled={uazapiLoading}
                          className="w-full"
                          size="lg"
                        >
                          {uazapiLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Gerando QR Code...
                            </>
                          ) : (
                            <>
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Conectar WhatsApp
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {/* Show QR Code card if we have a QR code, regardless of connected status */}
                    {uazapiStatus.qrCode && !uazapiStatus.connected && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            QR Code para Conexão
                            {polling && (
                              <span className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Aguardando conexão...
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription>
                            Escaneie o QR Code abaixo com seu WhatsApp para
                            conectar a instância
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-center p-4">
                            <img
                              src={uazapiStatus.qrCode}
                              alt="QR Code WhatsApp"
                              className="max-w-xs border rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground text-center">
                            1. Abra o WhatsApp no seu celular
                            <br />
                            2. Vá em Configurações → Aparelhos conectados
                            <br />
                            3. Toque em "Conectar um aparelho"
                            <br />
                            4. Escaneie este QR Code
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 dark:text-blue-100">
                            Como funciona a integração
                          </h4>
                          <ul className="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
                            <li>
                              • Envio automático de confirmações de agendamento
                            </li>
                            <li>• Lembretes de consultas por WhatsApp</li>
                            <li>
                              • Notificações de cancelamento ou reagendamento
                            </li>
                            <li>• Comunicação direta com clientes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
