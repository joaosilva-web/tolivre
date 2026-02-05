"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export default function PrecosPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const pricing = [
    {
      name: "Básico",
      monthlyPrice: 29.9,
      yearlyPrice: 287.04,
      description: "Perfeito para profissionais autônomos",
      popular: false,
      features: [
        "1 profissional",
        "Agendamentos ilimitados",
        "Gestão de clientes",
        "WhatsApp integrado",
        "Página de agendamento",
        "Suporte por email",
      ],
    },
    {
      name: "Profissional",
      monthlyPrice: 59.9,
      yearlyPrice: 574.08,
      description: "Ideal para pequenos salões e barbearias",
      popular: true,
      features: [
        "Até 5 profissionais",
        "Tudo do Básico +",
        "Relatórios detalhados",
        "Lembretes automáticos",
        "Suporte prioritário",
      ],
    },
    {
      name: "Pro Plus",
      monthlyPrice: 99.9,
      yearlyPrice: 958.08,
      description: "Para salões em crescimento",
      popular: false,
      features: [
        "Até 15 profissionais",
        "Tudo do Profissional +",
        "Sistema de comissões",
        "Fotos dos profissionais",
        "Exceções de horário",
        "Relatórios avançados",
      ],
    },
    {
      name: "Business",
      monthlyPrice: 149.9,
      yearlyPrice: 1438.08,
      description: "Para estabelecimentos maiores",
      popular: false,
      features: [
        "Profissionais ilimitados",
        "Tudo do Pro Plus +",
        "Múltiplas unidades",
        "Suporte prioritário 24/7",
        "API de integração",
      ],
    },
  ];

  const getPrice = (plan: (typeof pricing)[0]) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: (typeof pricing)[0]) => {
    const yearlyTotal = plan.monthlyPrice * 12;
    const savings = yearlyTotal - plan.yearlyPrice;
    return Math.round(savings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="TôLivre" width={32} height={32} />
              <span className="text-2xl font-bold text-primary">TôLivre</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/login">
                <Button>Começar grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Planos que <span className="text-primary">impulsionam</span> seu
              negócio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Escolha o plano ideal para o seu negócio. Teste grátis por 7 dias,
              sem precisar de cartão de crédito.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 rounded-full bg-muted">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "yearly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Anual
                <span className="ml-2 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricing.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105"
                    : "border-border"
                } hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Mais popular
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      R$ {getPrice(plan).toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingCycle === "monthly" ? "mês" : "ano"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-primary mb-4">
                      Economize R$ {getSavings(plan)} por ano
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                  <Button
                    className="w-full rounded-full mb-6"
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/login">
                      Começar agora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Teste grátis de 7 dias
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Sem cartão de crédito
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Cancele quando quiser
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Posso testar antes de assinar?",
                a: "Sim! Oferecemos 7 dias de teste grátis em todos os planos, sem precisar de cartão de crédito.",
              },
              {
                q: "Posso mudar de plano depois?",
                a: "Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.",
              },
              {
                q: "Como funciona o pagamento?",
                a: "Aceitamos cartão de crédito e Pix. O pagamento é processado de forma segura através do Stripe e Mercado Pago.",
              },
              {
                q: "Há taxa de cancelamento?",
                a: "Não! Você pode cancelar sua assinatura a qualquer momento, sem custos adicionais.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Experimente grátis por 7 dias e transforme a gestão do seu negócio.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full px-8"
            asChild
          >
            <Link href="/login">
              Começar teste grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TôLivre. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="/legal/termos"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Termos
              </Link>
              <Link
                href="/legal/privacidade"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
