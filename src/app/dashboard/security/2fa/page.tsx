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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, Loader2, Key, Copy, Check, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function TwoFactorPage() {
  const { user, loading: sessionLoading } = useSession();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verifyToken, setVerifyToken] = useState("");
  const [disablePassword, setDisablePassword] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const loadStatus = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Verificar se 2FA está habilitado via endpoint de sessões ou criar um novo
      const res = await fetch("/api/security/sessions");
      if (res.ok) {
        // Por enquanto, assumir desabilitado. Em produção, criar endpoint específico
        setEnabled(false);
      }
    } catch (error) {
      console.error("Erro ao verificar status do 2FA:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadStatus();
    }
  }, [user]);

  const startSetup = async () => {
    setProcessing(true);
    try {
      const res = await fetch("/api/security/2fa/setup", {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        setQrCode(data.data.qrCodeUrl);
        setBackupCodes(data.data.backupCodes);
        setShowSetup(true);
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao configurar 2FA");
      }
    } catch (error) {
      console.error("Erro ao configurar 2FA:", error);
      alert("Erro ao configurar 2FA");
    } finally {
      setProcessing(false);
    }
  };

  const verifyAndEnable = async () => {
    if (!verifyToken || verifyToken.length !== 6) {
      alert("Digite um código válido de 6 dígitos");
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch("/api/security/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: verifyToken }),
      });

      if (res.ok) {
        alert("2FA ativado com sucesso!");
        setShowSetup(false);
        setEnabled(true);
        setVerifyToken("");
        setQrCode("");
      } else {
        const data = await res.json();
        alert(data.error || "Código inválido");
      }
    } catch (error) {
      console.error("Erro ao verificar 2FA:", error);
      alert("Erro ao verificar código");
    } finally {
      setProcessing(false);
    }
  };

  const disable2FA = async () => {
    if (!disablePassword) {
      alert("Digite sua senha para confirmar");
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch("/api/security/2fa/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: disablePassword }),
      });

      if (res.ok) {
        alert("2FA desativado com sucesso");
        setShowDisable(false);
        setEnabled(false);
        setDisablePassword("");
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao desativar 2FA");
      }
    } catch (error) {
      console.error("Erro ao desativar 2FA:", error);
      alert("Erro ao desativar 2FA");
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
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
            <h1 className="text-2xl font-bold">Autenticação de Dois Fatores (2FA)</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Status do 2FA</CardTitle>
              <CardDescription>
                Adicione uma camada extra de segurança à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className={`h-6 w-6 ${enabled ? "text-green-500" : "text-gray-400"}`} />
                  <div>
                    <p className="font-medium">
                      2FA está {enabled ? "ATIVO" : "INATIVO"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {enabled
                        ? "Sua conta está protegida com autenticação de dois fatores"
                        : "Recomendamos ativar para maior segurança"}
                    </p>
                  </div>
                </div>
                {!enabled ? (
                  <Button onClick={startSetup} disabled={processing}>
                    {processing ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Ativar 2FA
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={() => setShowDisable(true)}
                  >
                    Desativar 2FA
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Como funciona?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Baixe um app autenticador</p>
                    <p className="text-sm text-muted-foreground">
                      Google Authenticator, Authy, Microsoft Authenticator, etc
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Escaneie o QR code</p>
                    <p className="text-sm text-muted-foreground">
                      Use o app para escanear o código que aparecerá
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Digite o código de 6 dígitos</p>
                    <p className="text-sm text-muted-foreground">
                      Confirme com o código gerado pelo app
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Setup Dialog */}
      <Dialog open={showSetup} onOpenChange={setShowSetup}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configurar Autenticação de Dois Fatores</DialogTitle>
            <DialogDescription>
              Siga os passos abaixo para ativar o 2FA
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* QR Code */}
            {qrCode && (
              <div>
                <Label>1. Escaneie este QR Code</Label>
                <div className="flex justify-center p-4 bg-white rounded-lg mt-2">
                  <Image
                    src={qrCode}
                    alt="QR Code 2FA"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            )}

            {/* Backup Codes */}
            {backupCodes.length > 0 && (
              <div>
                <Label className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  2. Salve estes códigos de recuperação
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Use-os se perder acesso ao seu autenticador. Cada código funciona apenas uma vez.
                </p>
                <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg">
                  {backupCodes.map((code) => (
                    <div
                      key={code}
                      className="flex items-center justify-between text-sm font-mono p-2 bg-background rounded"
                    >
                      <span>{code}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(code)}
                      >
                        {copiedCode === code ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verify Token */}
            <div>
              <Label htmlFor="verifyToken">3. Digite o código de 6 dígitos</Label>
              <Input
                id="verifyToken"
                type="text"
                placeholder="000000"
                maxLength={6}
                value={verifyToken}
                onChange={(e) => setVerifyToken(e.target.value.replace(/\D/g, ""))}
                className="mt-1 text-center text-2xl tracking-widest font-mono"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSetup(false)}>
              Cancelar
            </Button>
            <Button onClick={verifyAndEnable} disabled={processing || verifyToken.length !== 6}>
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Ativar 2FA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disable Dialog */}
      <Dialog open={showDisable} onOpenChange={setShowDisable}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Desativar Autenticação de Dois Fatores</DialogTitle>
            <DialogDescription>
              Digite sua senha para confirmar a desativação do 2FA
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="disablePassword">Senha</Label>
            <Input
              id="disablePassword"
              type="password"
              value={disablePassword}
              onChange={(e) => setDisablePassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisable(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={disable2FA}
              disabled={processing || !disablePassword}
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Desativar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarInset>
  );
}
