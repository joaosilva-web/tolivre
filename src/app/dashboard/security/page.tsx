"use client";

import { useState, useEffect } from "react";
import useSession from "@/hooks/useSession";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Loader2, Smartphone, Monitor, Tablet, AlertTriangle, Check, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Session {
  id: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  lastActivity: string;
  createdAt: string;
}

interface LoginHistory {
  id: string;
  ip: string;
  device: string;
  browser: string;
  os: string;
  location: string | null;
  success: boolean;
  failReason: string | null;
  createdAt: string;
}

export default function SecurityPage() {
  const { user, loading: sessionLoading } = useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState<string | null>(null);

  const loadData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [sessionsRes, historyRes] = await Promise.all([
        fetch("/api/security/sessions"),
        fetch("/api/security/login-history?pageSize=10"),
      ]);

      if (sessionsRes.ok) {
        const data = await sessionsRes.json();
        setSessions(data.data || []);
      }

      if (historyRes.ok) {
        const data = await historyRes.json();
        setLoginHistory(data.data?.data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar dados de segurança:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const revokeSession = async (sessionId: string) => {
    if (!confirm("Deseja realmente encerrar esta sessão?")) return;

    setRevoking(sessionId);
    try {
      const res = await fetch(`/api/security/sessions?sessionId=${sessionId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Sessão encerrada com sucesso!");
        loadData();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao encerrar sessão");
      }
    } catch (error) {
      console.error("Erro ao encerrar sessão:", error);
      alert("Erro ao encerrar sessão");
    } finally {
      setRevoking(null);
    }
  };

  const revokeAllSessions = async () => {
    if (!confirm("Deseja encerrar todas as sessões? Você precisará fazer login novamente em todos os dispositivos.")) return;

    setRevoking("all");
    try {
      const res = await fetch("/api/security/sessions?all=true", {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Todas as sessões foram encerradas!");
        loadData();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao encerrar sessões");
      }
    } catch (error) {
      console.error("Erro ao encerrar sessões:", error);
      alert("Erro ao encerrar sessões");
    } finally {
      setRevoking(null);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      case "tablet":
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  if (sessionLoading || loading) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Segurança da Conta</h1>
          </div>

          {/* Sessões Ativas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sessões Ativas</CardTitle>
                  <CardDescription>
                    Dispositivos com acesso à sua conta no momento
                  </CardDescription>
                </div>
                {sessions.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={revokeAllSessions}
                    disabled={revoking === "all"}
                  >
                    {revoking === "all" ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Encerrar Todas
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma sessão ativa encontrada</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-primary">
                          {getDeviceIcon(session.device)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {session.device || "Dispositivo"} - {session.browser || "Navegador"}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {session.os || "Sistema"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            IP: {session.ip}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Última atividade:{" "}
                            {format(new Date(session.lastActivity), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => revokeSession(session.id)}
                        disabled={revoking === session.id}
                      >
                        {revoking === session.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Histórico de Logins */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Logins Recentes</CardTitle>
              <CardDescription>
                Últimas 10 tentativas de acesso à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loginHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum histórico encontrado</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {loginHistory.map((login) => (
                    <div
                      key={login.id}
                      className={`flex items-start gap-4 p-4 border rounded-lg ${
                        !login.success ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800" : ""
                      }`}
                    >
                      <div className={login.success ? "text-green-500" : "text-red-500"}>
                        {login.success ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <AlertTriangle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getDeviceIcon(login.device)}
                          <span className="font-medium">
                            {login.device} - {login.browser} ({login.os})
                          </span>
                          <Badge
                            variant={login.success ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {login.success ? "Sucesso" : "Falhou"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          IP: {login.ip}
                          {login.location && ` • ${login.location}`}
                        </p>
                        {login.failReason && (
                          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                            Motivo: {login.failReason}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(login.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dicas de Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>Dicas de Segurança</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use uma senha forte e única para sua conta</li>
                <li>• Ative a autenticação de dois fatores quando disponível</li>
                <li>• Não compartilhe suas credenciais com outras pessoas</li>
                <li>• Revise regularmente as sessões ativas e o histórico de login</li>
                <li>• Encerre sessões em dispositivos que não reconhecer</li>
                <li>• Mantenha seu sistema operacional e navegador atualizados</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
