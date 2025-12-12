"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";

export default function VerificarEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [alreadyVerified, setAlreadyVerified] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Token de verificação não fornecido");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          setSuccess(true);
          setAlreadyVerified(data.data?.alreadyVerified || false);

          // Redirecionar para login após 3 segundos se for nova verificação
          if (!data.data?.alreadyVerified) {
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          }
        } else {
          setError(
            data.error || "Erro ao verificar email. O token pode ter expirado."
          );
        }
      } catch (err) {
        console.error("Erro ao verificar email:", err);
        setError("Erro ao verificar email. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-blue-500/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            {loading ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : success ? (
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            ) : (
              <XCircle className="w-8 h-8 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {loading
              ? "Verificando email..."
              : success
              ? "Email Verificado!"
              : "Erro na Verificação"}
          </CardTitle>
          <CardDescription>
            {loading
              ? "Aguarde enquanto verificamos seu email"
              : success
              ? alreadyVerified
                ? "Este email já foi verificado anteriormente"
                : "Seu email foi verificado com sucesso"
              : "Não foi possível verificar seu email"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {success && !alreadyVerified && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-sm">
                Parabéns! Sua conta está ativa. Você será redirecionado para o
                login em alguns segundos...
              </AlertDescription>
            </Alert>
          )}

          {success && alreadyVerified && (
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <Mail className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-sm">
                Seu email já está verificado. Você pode fazer login normalmente.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2 pt-4">
            {success ? (
              <Link href="/login" className="block">
                <Button className="w-full" size="lg">
                  Ir para Login
                </Button>
              </Link>
            ) : (
              <Link href="/registro" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Criar Nova Conta
                </Button>
              </Link>
            )}

            <Link href="/" className="block">
              <Button variant="ghost" className="w-full" size="lg">
                Voltar para Home
              </Button>
            </Link>
          </div>

          {error && error.includes("expirado") && (
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Precisa de um novo link de verificação?
              </p>
              <Link href="/reenviar-verificacao">
                <Button variant="link" size="sm">
                  Reenviar email de verificação
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
