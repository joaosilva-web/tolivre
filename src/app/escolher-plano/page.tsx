"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import useSession from "@/hooks/useSession";

interface PlanOption {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  recommended?: boolean;
}

const plans: PlanOption[] = [
  {
    id: "basic",
    name: "Básico",
    price: 69.9,
    interval: "mês",
    features: [
      "Agendamentos ilimitados",
      "1 profissional",
      "Gestão de clientes",
      "Gestão de serviços",
      "Calendário semanal",
      "Suporte por email",
    ],
  },
  {
    id: "professional",
    name: "Profissional",
    price: 99.9,
    interval: "mês",
    features: [
      "Tudo do Básico +",
      "Até 3 profissionais",
      "Integração WhatsApp",
      "Lembretes automáticos",
      "Relatórios e estatísticas",
      "Página pública de agendamento",
    ],
    recommended: true,
  },
  {
    id: "business",
    name: "Business",
    price: 169.9,
    interval: "mês",
    features: [
      "Tudo do Profissional +",
      "Profissionais ilimitados",
      "Sistema de comissões",
      "Fotos dos profissionais",
      "Notificações em tempo real",
      "Suporte 24/7",
    ],
  },
];

export default function EscolherPlanoPage() {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Se usuário não está logado, redirecionar para login
    if (!sessionLoading && !user) {
      router.push("/login");
    }
    // TODO: Verificar se já tem assinatura ativa via API
  }, [user, sessionLoading, router]);

  const handleSelectPlan = async (planId: string) => {
    if (!user) return;

    setSelectedPlan(planId);
    setProcessing(true);

    try {
      // Criar checkout session no Mercado Pago
      const response = await fetch("/api/subscription/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirecionar para página de pagamento do Mercado Pago
        window.location.href = data.data.checkoutUrl;
      } else {
        const error = await response.json();
        alert(error.error || "Erro ao criar checkout");
        setProcessing(false);
      }
    } catch (error) {
      console.error("Erro ao processar plano:", error);
      alert("Erro ao processar sua solicitação. Tente novamente.");
      setProcessing(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Seu período de teste expirou
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Escolha um plano para continuar usando o ToLivre
          </p>
          <p className="text-sm text-muted-foreground">
            Obrigado por testar nossa plataforma! Agora é hora de escolher o
            plano ideal para seu negócio.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-8 hover:shadow-2xl transition-all duration-300 ${
                plan.recommended ? "border-2 border-primary" : ""
              } ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold">R$ {plan.price}</span>
                  <span className="text-muted-foreground">
                    /{plan.interval}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="w-full"
                variant={plan.recommended ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={processing}
              >
                {processing && selectedPlan === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    Escolher {plan.name}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Precisa de mais informações?{" "}
            <a
              href="/contato"
              className="text-primary hover:underline font-semibold"
            >
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
