"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLANS, PlanName } from "@/lib/subscriptionLimits";
import useSession from "@/hooks/useSession";

interface SubscriptionData {
  subscription: {
    plan: string;
    status: string;
  } | null;
}

export default function PlansPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useSession();
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!userLoading && user) {
      loadSubscription();
    }
  }, [userLoading, user]);

  const loadSubscription = async () => {
    try {
      const res = await fetch("/api/subscriptions");
      if (res.ok) {
        const data = await res.json();
        setSubscriptionData(data.data);
      }
    } catch (err) {
      console.error("Erro ao carregar assinatura:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planName: PlanName) => {
    if (processingPlan) return;

    setProcessingPlan(planName);
    try {
      const res = await fetch("/api/subscriptions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName }),
      });

      if (res.ok) {
        const data = await res.json();
        // Redirecionar para página de pagamento do Mercado Pago
        window.location.href = data.data.initPoint;
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao processar upgrade");
      }
    } catch (err) {
      console.error("Erro ao fazer upgrade:", err);
      alert("Erro ao processar upgrade");
    } finally {
      setProcessingPlan(null);
    }
  };

  const handleSimulatePayment = async (planName: PlanName) => {
    if (processingPlan) return;

    setProcessingPlan(planName);
    try {
      const res = await fetch("/api/subscriptions/simulate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName }),
      });

      if (res.ok) {
        alert("Pagamento simulado com sucesso!");
        router.push("/dashboard/assinatura");
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao simular pagamento");
      }
    } catch (err) {
      console.error("Erro ao simular pagamento:", err);
      alert("Erro ao simular pagamento");
    } finally {
      setProcessingPlan(null);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentPlan = subscriptionData?.subscription?.plan || "FREE";

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Escolha seu plano</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Comece grátis e faça upgrade quando precisar de mais recursos
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {Object.entries(PLANS).map(([key, plan]) => {
          const isCurrentPlan = currentPlan === key;
          const isPlanActive =
            subscriptionData?.subscription?.status === "ACTIVE";

          return (
            <Card
              key={key}
              className={`relative ${
                plan.popular ? "border-primary shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <Badge
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  variant="default"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Mais Popular
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.displayName}
                  {isCurrentPlan && isPlanActive && (
                    <Badge variant="secondary">Atual</Badge>
                  )}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ {plan.price}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">
                      {plan.features.appointments === "unlimited"
                        ? "Agendamentos ilimitados"
                        : `${plan.features.appointments} agendamentos/mês`}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">
                      {plan.features.professionals === "unlimited"
                        ? "Profissionais ilimitados"
                        : `${plan.features.professionals} ${
                            plan.features.professionals === 1
                              ? "profissional"
                              : "profissionais"
                          }`}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">
                      Serviços e clientes ilimitados
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Notificações WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">
                      Suporte{" "}
                      {plan.features.support === "24/7"
                        ? "24/7"
                        : plan.features.support === "priority"
                        ? "prioritário"
                        : "por email"}
                    </span>
                  </li>
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                {key === "FREE" ? (
                  <Button className="w-full" variant="outline" disabled>
                    Plano Atual
                  </Button>
                ) : isCurrentPlan && isPlanActive ? (
                  <Button className="w-full" variant="outline" disabled>
                    Plano Atual
                  </Button>
                ) : (
                  <>
                    <Button
                      className="w-full"
                      onClick={() => handleUpgrade(key as PlanName)}
                      disabled={!!processingPlan}
                    >
                      {processingPlan === key ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        "Assinar"
                      )}
                    </Button>
                    {process.env.NODE_ENV === "development" && (
                      <Button
                        className="w-full"
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSimulatePayment(key as PlanName)}
                        disabled={!!processingPlan}
                      >
                        <Zap className="mr-2 h-3 w-3" />
                        Simular Pagamento (Dev)
                      </Button>
                    )}
                  </>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Todos os planos incluem 7 dias de garantia de reembolso</p>
        <p className="mt-2">
          Tem dúvidas?{" "}
          <button
            onClick={() => router.push("/contato")}
            className="text-primary hover:underline"
          >
            Entre em contato
          </button>
        </p>
      </div>
    </div>
  );
}
