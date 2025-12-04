"use client";

import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PendingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <Clock className="h-10 w-10 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl">Pagamento Pendente</CardTitle>
          <CardDescription>Aguardando confirmação do pagamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Seu pagamento está sendo processado. Você receberá um email assim
            que for confirmado.
          </p>
          <p className="text-sm text-muted-foreground">
            Para pagamentos via boleto ou Pix, isso pode levar alguns minutos.
          </p>
          <div className="space-y-2">
            <Button
              onClick={() => router.push("/dashboard/assinatura")}
              className="w-full"
            >
              Ir para Minha Assinatura
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="w-full"
            >
              Voltar ao Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
