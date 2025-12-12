"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorToken, setTwoFactorToken] = useState("");
  const [requires2FA, setRequires2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          twoFactorToken: twoFactorToken || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.data?.requires2FA) {
          // Mostrar campo de 2FA
          setRequires2FA(true);
          setError("");
        } else {
          // Login bem-sucedido
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        setError(data.error || "Erro ao fazer login");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          {requires2FA
            ? "Digite o código do seu aplicativo autenticador"
            : "Entre com suas credenciais"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!requires2FA ? (
            <>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="••••••••"
                />
              </div>
            </>
          ) : (
            <div>
              <Label
                htmlFor="twoFactorToken"
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Código de Autenticação (6 dígitos)
              </Label>
              <Input
                id="twoFactorToken"
                type="text"
                value={twoFactorToken}
                onChange={(e) =>
                  setTwoFactorToken(e.target.value.replace(/\D/g, ""))
                }
                maxLength={6}
                required
                disabled={loading}
                placeholder="000000"
                className="text-center text-2xl tracking-widest font-mono mt-2"
                autoFocus
              />
              <p className="text-sm text-muted-foreground mt-2">
                Ou use um dos seus códigos de recuperação
              </p>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
              {error.includes("verifique seu email") && (
                <div className="mt-2 pt-2 border-t border-destructive/20">
                  <a
                    href="/reenviar-verificacao"
                    className="text-xs underline hover:no-underline"
                  >
                    Reenviar email de verificação
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            {requires2FA && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setRequires2FA(false);
                  setTwoFactorToken("");
                  setError("");
                }}
                disabled={loading}
              >
                Voltar
              </Button>
            )}
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Entrando...
                </>
              ) : requires2FA ? (
                "Verificar Código"
              ) : (
                "Entrar"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
