"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

export default function ResetarSenhaPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (pwd: string) => {
    const errors = [];
    if (pwd.length < 8) errors.push("mínimo 8 caracteres");
    if (!/[A-Z]/.test(pwd)) errors.push("uma letra maiúscula");
    if (!/[a-z]/.test(pwd)) errors.push("uma letra minúscula");
    if (!/[0-9]/.test(pwd)) errors.push("um número");
    return errors;
  };

  const passwordErrors = password ? validatePassword(password) : [];
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordErrors.length > 0) {
      setError("Senha não atende aos requisitos mínimos");
      return;
    }

    if (!passwordsMatch) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Erro ao redefinir senha");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      setError("Erro ao processar solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="TôLivre"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold text-primary">TôLivre</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Redefinir senha</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Escolha uma nova senha segura para sua conta
            </p>
          </CardHeader>

          <CardContent>
            {success ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Senha redefinida com sucesso!
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Você será redirecionado para o login em instantes...
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/login">
                  <Button className="w-full">Ir para o login agora</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nova Senha */}
                <div className="space-y-2">
                  <Label htmlFor="password">Nova senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {password && passwordErrors.length > 0 && (
                    <p className="text-xs text-red-600">
                      Falta: {passwordErrors.join(", ")}
                    </p>
                  )}
                </div>

                {/* Confirmar Senha */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-red-600">
                      As senhas não coincidem
                    </p>
                  )}
                </div>

                {/* Requisitos */}
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs font-medium mb-2">
                    Requisitos da senha:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li
                      className={password.length >= 8 ? "text-green-600" : ""}
                    >
                      ✓ Mínimo 8 caracteres
                    </li>
                    <li
                      className={/[A-Z]/.test(password) ? "text-green-600" : ""}
                    >
                      ✓ Uma letra maiúscula
                    </li>
                    <li
                      className={/[a-z]/.test(password) ? "text-green-600" : ""}
                    >
                      ✓ Uma letra minúscula
                    </li>
                    <li
                      className={/[0-9]/.test(password) ? "text-green-600" : ""}
                    >
                      ✓ Um número
                    </li>
                  </ul>
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    loading ||
                    !password ||
                    !confirmPassword ||
                    passwordErrors.length > 0 ||
                    !passwordsMatch
                  }
                >
                  {loading ? "Salvando..." : "Redefinir senha"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TôLivre. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
