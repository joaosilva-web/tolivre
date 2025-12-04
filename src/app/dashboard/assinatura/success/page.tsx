"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Dar tempo para o webhook processar
    const timeout = setTimeout(() => {
      router.push("/dashboard/assinatura");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Pagamento Aprovado!</CardTitle>
          <CardDescription>Seu plano foi ativado com sucesso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Você será redirecionado para a página de assinatura em alguns
            segundos...
          </p>
          <Button
            onClick={() => router.push("/dashboard/assinatura")}
            className="w-full"
          >
            Ir para Minha Assinatura
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
