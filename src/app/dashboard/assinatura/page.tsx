"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CreditCard,
  Loader2,
  Users,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PLANS, PlanName } from "@/lib/subscriptionLimits";
import useSession from "@/hooks/useSession";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Payment {
  id: string;
  amount: number;
  status: string;
  paidAt: string | null;
  createdAt: string;
}

interface SubscriptionData {
  subscription: {
    plan: string;
    status: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  } | null;
  payments: Payment[];
  usage: {
    appointments: number;
    professionals: number;
  };
}

export default function SubscriptionPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useSession();
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && user) {
      loadData();
    }
  }, [userLoading, user]);

  const loadData = async () => {
    try {
      const res = await fetch("/api/subscriptions");
      if (res.ok) {
        const result = await res.json();
        setData(result.data);
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentPlan = (data?.subscription?.plan || "FREE") as PlanName;
  const planInfo = PLANS[currentPlan];
  const isActive = data?.subscription?.status === "ACTIVE";

  // Calcular percentuais de uso
  const appointmentsLimit = planInfo.features.appointments;
  const professionalsLimit = planInfo.features.professionals;

  const appointmentsPercent =
    appointmentsLimit === "unlimited"
      ? 0
      : ((data?.usage.appointments || 0) / appointmentsLimit) * 100;

  const professionalsPercent =
    professionalsLimit === "unlimited"
      ? 0
      : ((data?.usage.professionals || 0) / professionalsLimit) * 100;

  const showAppointmentsWarning = appointmentsPercent >= 80;
  const showProfessionalsWarning = professionalsPercent >= 80;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Minha Assinatura</h1>
        <p className="text-muted-foreground">
          Gerencie seu plano e veja o histórico de pagamentos
        </p>
      </div>

      {/* Plano Atual */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {planInfo.displayName}
                <Badge variant={isActive ? "default" : "secondary"}>
                  {isActive ? "Ativo" : "Gratuito"}
                </Badge>
              </CardTitle>
              <CardDescription>
                {currentPlan === "FREE"
                  ? "Você está no plano gratuito"
                  : `R$ ${planInfo.price}/mês`}
              </CardDescription>
            </div>
            <Button onClick={() => router.push("/dashboard/assinatura/planos")}>
              {currentPlan === "FREE" ? "Fazer Upgrade" : "Alterar Plano"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {data?.subscription && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Período atual</p>
                <p className="font-medium">
                  {format(
                    new Date(data.subscription.currentPeriodStart),
                    "dd/MM/yyyy",
                    { locale: ptBR }
                  )}{" "}
                  -{" "}
                  {format(
                    new Date(data.subscription.currentPeriodEnd),
                    "dd/MM/yyyy",
                    { locale: ptBR }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Próxima cobrança
                </p>
                <p className="font-medium">
                  {data.subscription.cancelAtPeriodEnd
                    ? "Cancelamento agendado"
                    : format(
                        new Date(data.subscription.currentPeriodEnd),
                        "dd/MM/yyyy",
                        { locale: ptBR }
                      )}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Avisos de Limite */}
      {(showAppointmentsWarning || showProfessionalsWarning) && (
        <Alert className="mb-6 border-orange-500">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong className="block mb-1">
              Atenção aos limites do seu plano
            </strong>
            {showAppointmentsWarning &&
              `Você já usou ${appointmentsPercent.toFixed(
                0
              )}% dos agendamentos deste mês. `}
            {showProfessionalsWarning &&
              `Você já cadastrou ${data?.usage.professionals} de ${professionalsLimit} profissionais. `}
            <button
              onClick={() => router.push("/dashboard/assinatura/planos")}
              className="font-medium underline"
            >
              Faça upgrade para continuar sem limites.
            </button>
          </AlertDescription>
        </Alert>
      )}

      {/* Cards de Uso */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Agendamentos (este mês)
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.usage.appointments || 0}
              {appointmentsLimit !== "unlimited" && (
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / {appointmentsLimit}
                </span>
              )}
            </div>
            {appointmentsLimit !== "unlimited" && (
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min(appointmentsPercent, 100)}%` }}
                />
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              {appointmentsLimit === "unlimited"
                ? "Ilimitado"
                : `${
                    appointmentsLimit - (data?.usage.appointments || 0)
                  } restantes`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profissionais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.usage.professionals || 0}
              {professionalsLimit !== "unlimited" && (
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / {professionalsLimit}
                </span>
              )}
            </div>
            {professionalsLimit !== "unlimited" && (
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min(professionalsPercent, 100)}%` }}
                />
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              {professionalsLimit === "unlimited"
                ? "Ilimitado"
                : `${
                    professionalsLimit - (data?.usage.professionals || 0)
                  } disponíveis`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Pagamentos */}
      {data?.payments && data.payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Histórico de Pagamentos
            </CardTitle>
            <CardDescription>Últimas transações realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {format(
                        new Date(payment.paidAt || payment.createdAt),
                        "dd/MM/yyyy HH:mm",
                        { locale: ptBR }
                      )}
                    </TableCell>
                    <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "APPROVED"
                            ? "default"
                            : payment.status === "PENDING"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {payment.status === "APPROVED"
                          ? "Aprovado"
                          : payment.status === "PENDING"
                          ? "Pendente"
                          : "Rejeitado"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
