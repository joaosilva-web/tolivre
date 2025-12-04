"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle,
  X,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  Calendar,
  MessageCircle,
  BarChart3,
  Clock,
  Sparkles,
  HelpCircle,
  Check,
  Crown,
  Rocket,
  Building,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function PrecosPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Parallax effect
    const handleScroll = () => {
      const elements = document.querySelectorAll(".parallax-bg");
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || "0.5");
        const yPos = -(window.scrollY * speed);
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      tagline: "Perfeito para começar",
      icon: Rocket,
      monthlyPrice: 0,
      yearlyPrice: 0,
      discount: 0,
      popular: false,
      features: [
        { text: "Até 50 agendamentos/mês", included: true },
        { text: "1 profissional", included: true },
        { text: "Gestão básica de clientes", included: true },
        { text: "Suporte por email", included: true },
        { text: "Integração WhatsApp", included: false },
        { text: "Lembretes automáticos", included: false },
        { text: "Relatórios avançados", included: false },
        { text: "API completa", included: false },
      ],
      cta: "Começar Grátis",
      ctaVariant: "outline" as const,
      gradient: "from-gray-500 to-slate-600",
    },
    {
      id: "professional",
      name: "Professional",
      tagline: "Para negócios em crescimento",
      icon: Star,
      monthlyPrice: 49,
      yearlyPrice: 470,
      discount: 20,
      popular: true,
      features: [
        { text: "Agendamentos ilimitados", included: true },
        { text: "Até 3 profissionais", included: true },
        { text: "Gestão completa de clientes", included: true },
        { text: "Integração WhatsApp", included: true },
        { text: "Lembretes automáticos", included: true },
        { text: "Relatórios avançados", included: true },
        { text: "Suporte prioritário", included: true },
        { text: "Apps mobile", included: true },
        { text: "API completa", included: false },
        { text: "White label", included: false },
      ],
      cta: "Começar Agora",
      ctaVariant: "default" as const,
      gradient: "from-primary to-blue-600",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "Para grandes equipes",
      icon: Crown,
      monthlyPrice: 149,
      yearlyPrice: 1430,
      discount: 20,
      popular: false,
      features: [
        { text: "Tudo do Professional +", included: true },
        { text: "Profissionais ilimitados", included: true },
        { text: "API completa", included: true },
        { text: "White label", included: true },
        { text: "Integrações customizadas", included: true },
        { text: "Treinamento dedicado", included: true },
        { text: "Suporte 24/7", included: true },
        { text: "Account manager", included: true },
        { text: "SLA garantido", included: true },
        { text: "Migração assistida", included: true },
      ],
      cta: "Falar com Vendas",
      ctaVariant: "outline" as const,
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const faqs = [
    {
      question: "Posso mudar de plano a qualquer momento?",
      answer:
        "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente e o valor é ajustado proporcionalmente. Não há taxas ou penalidades para mudanças de plano.",
    },
    {
      question: "Como funciona a cobrança?",
      answer:
        "A cobrança é feita mensalmente ou anualmente (com desconto) via cartão de crédito ou boleto bancário. Você recebe uma fatura alguns dias antes da data de renovação e pode gerenciar seu método de pagamento a qualquer momento no painel.",
    },
    {
      question: "Preciso de cartão de crédito no plano gratuito?",
      answer:
        "Não! O plano Starter é totalmente gratuito e não requer cadastro de cartão de crédito. Você só precisará informar dados de pagamento se decidir fazer upgrade para um plano pago. Sem surpresas, sem taxas ocultas.",
    },
    {
      question: "Há desconto para pagamento anual?",
      answer:
        "Sim! Oferecemos 20% de desconto para assinaturas anuais em todos os planos pagos. Por exemplo, o plano Professional sai de R$ 588/ano para apenas R$ 470/ano. É como ganhar mais de 2 meses grátis!",
    },
    {
      question: "O que acontece se eu exceder os limites do meu plano?",
      answer:
        "No plano Starter, você receberá uma notificação ao atingir 80% do limite de agendamentos e poderá fazer upgrade antes de atingir o limite. Nos planos pagos, os agendamentos são ilimitados, então você nunca precisa se preocupar com isso.",
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer:
        "Sim! Não há contratos de longo prazo ou taxas de cancelamento. Você pode cancelar sua assinatura a qualquer momento diretamente no painel. Se cancelar um plano anual, você continuará tendo acesso até o final do período pago.",
    },
    {
      question: "Vocês oferecem garantia de devolução do dinheiro?",
      answer:
        "Sim! Oferecemos garantia de 30 dias em todos os planos pagos. Se você não ficar completamente satisfeito com o ToLivre, reembolsamos 100% do valor pago, sem perguntas. Simples assim.",
    },
    {
      question: "O que está incluído no suporte?",
      answer:
        "O plano Starter tem suporte por email com resposta em até 48h. Professional e Enterprise têm suporte prioritário por email, chat e WhatsApp. Enterprise também inclui suporte 24/7, account manager dedicado e linha direta com nossa equipe técnica.",
    },
    {
      question: "Posso adicionar mais profissionais depois?",
      answer:
        "Claro! No plano Professional, você pode ter até 3 profissionais. Se precisar de mais, basta fazer upgrade para o Enterprise que oferece profissionais ilimitados. A mudança é instantânea e o valor é ajustado proporcionalmente.",
    },
    {
      question: "Vocês ajudam na migração de outra plataforma?",
      answer:
        "Sim! Nos planos Professional e Enterprise, oferecemos assistência na migração dos seus dados de outras plataformas. Nossa equipe ajuda a importar seus clientes, serviços e histórico de agendamentos. No Enterprise, a migração é totalmente assistida.",
    },
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Segurança Garantida",
      description:
        "Certificação SSL, criptografia de dados e conformidade LGPD em todos os planos",
    },
    {
      icon: Zap,
      title: "Atualizações Incluídas",
      description:
        "Todos os novos recursos e melhorias são automaticamente incluídos, sem custo adicional",
    },
    {
      icon: Users,
      title: "Treinamento Gratuito",
      description:
        "Vídeos tutoriais, documentação completa e sessões de onboarding para todos os planos",
    },
    {
      icon: Clock,
      title: "Migração Gratuita",
      description:
        "Nossa equipe ajuda a migrar seus dados de outras plataformas sem custo",
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Salão Bella Donna",
      avatar: "MS",
      plan: "Professional",
      text: "Mudamos para o plano Professional e não me arrependo. A integração com WhatsApp reduziu nossos cancelamentos pela metade!",
      rating: 5,
    },
    {
      name: "Carlos Mendes",
      role: "Clínica Med+",
      avatar: "CM",
      plan: "Enterprise",
      text: "Como clínica com 8 profissionais, o plano Enterprise foi essencial. O suporte 24/7 e a API nos permitiram integrar com nosso sistema interno.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Personal Trainer",
      avatar: "AC",
      plan: "Professional",
      text: "Comecei no plano gratuito e em 2 meses já havia migrado para o Professional. Melhor investimento que fiz no meu negócio!",
      rating: 5,
    },
  ];

  const getPrice = (plan: (typeof plans)[0]) => {
    if (plan.monthlyPrice === 0) return "R$ 0";
    return billingCycle === "monthly"
      ? `R$ ${plan.monthlyPrice}`
      : `R$ ${Math.round(plan.yearlyPrice / 12)}`;
  };

  const getTotalYearlyPrice = (plan: (typeof plans)[0]) => {
    if (plan.monthlyPrice === 0) return null;
    return billingCycle === "yearly"
      ? `R$ ${plan.yearlyPrice}/ano`
      : `R$ ${plan.monthlyPrice * 12}/ano`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-muted overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="parallax-bg absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          data-speed="0.3"
        />
        <div
          className="parallax-bg absolute top-1/3 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          data-speed="0.5"
        />
        <div
          className="parallax-bg absolute bottom-20 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"
          data-speed="0.4"
        />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b bg-background/80 backdrop-blur-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Voltar</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-primary to-blue-600">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Planos Transparentes
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
                Preços que crescem
              </span>
              <span className="block">com o seu negócio</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Escolha o plano ideal para o seu momento. Sem taxas escondidas,
              sem surpresas. Cancele quando quiser.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center gap-4 pt-8">
              <span
                className={`text-lg font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Mensal
              </span>
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "yearly" : "monthly"
                  )
                }
                className="relative w-16 h-8 bg-primary rounded-full transition-all duration-300 hover:scale-110"
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                    billingCycle === "yearly" ? "translate-x-8" : ""
                  }`}
                />
              </button>
              <span
                className={`text-lg font-medium transition-colors ${
                  billingCycle === "yearly"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Anual
              </span>
              {billingCycle === "yearly" && (
                <span className="ml-2 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
                  Economize 20%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative group ${
                  plan.popular ? "md:-mt-8 md:scale-105" : ""
                }`}
              >
                <div
                  className={`relative bg-card rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    plan.popular
                      ? "border-2 border-primary shadow-primary/20"
                      : "border border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        ⭐ Mais Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.tagline}</p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span
                        className={`text-5xl font-bold ${
                          plan.popular
                            ? "bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                            : ""
                        }`}
                      >
                        {getPrice(plan)}
                      </span>
                      <span className="text-muted-foreground text-lg">
                        /mês
                      </span>
                    </div>
                    {billingCycle === "yearly" && plan.monthlyPrice > 0 && (
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">
                          {getTotalYearlyPrice(plan)}
                        </p>
                        {plan.discount > 0 && (
                          <p className="text-green-600 dark:text-green-400 font-semibold">
                            Economize {plan.discount}% no plano anual
                          </p>
                        )}
                      </div>
                    )}
                    {plan.monthlyPrice === 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Grátis para sempre
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle
                            className={`w-5 h-5 shrink-0 mt-0.5 ${
                              plan.popular ? "text-primary" : "text-green-500"
                            }`}
                          />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feature.included
                              ? plan.popular
                                ? "font-medium"
                                : ""
                              : "text-muted-foreground/60"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={plan.id === "enterprise" ? "/contato" : "/register"}
                    className="w-full"
                  >
                    <Button
                      variant={plan.ctaVariant}
                      className={`w-full text-lg py-6 ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
                          : ""
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      {plan.id !== "enterprise" && (
                        <ArrowRight className="ml-2 w-5 h-5" />
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-green-500" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-green-500" />
                <span>Garantia de 30 dias</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-green-500" />
                <span>Suporte em português</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="relative py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Compare todos os recursos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Veja em detalhes o que está incluído em cada plano
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary/10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Recursos
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Starter
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-primary">
                    Professional
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-6 py-4 font-medium" colSpan={4}>
                    Agendamentos
                  </td>
                </tr>
                {[
                  {
                    name: "Agendamentos por mês",
                    starter: "50",
                    professional: "Ilimitado",
                    enterprise: "Ilimitado",
                  },
                  {
                    name: "Profissionais",
                    starter: "1",
                    professional: "3",
                    enterprise: "Ilimitado",
                  },
                  {
                    name: "Agendamento online 24/7",
                    starter: true,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    name: "Calendário inteligente",
                    starter: true,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    name: "Agendamentos recorrentes",
                    starter: false,
                    professional: true,
                    enterprise: true,
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                        )
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      {typeof row.professional === "boolean" ? (
                        row.professional ? (
                          <CheckCircle className="w-5 h-5 mx-auto text-primary" />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                        )
                      ) : (
                        row.professional
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                        )
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}

                <tr className="border-t border-border">
                  <td className="px-6 py-4 font-medium" colSpan={4}>
                    Comunicação
                  </td>
                </tr>
                {[
                  {
                    name: "Integração WhatsApp",
                    starter: false,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    name: "Lembretes automáticos",
                    starter: false,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    name: "Email marketing",
                    starter: false,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    name: "Notificações personalizadas",
                    starter: false,
                    professional: false,
                    enterprise: true,
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4 text-center">
                      {row.starter ? (
                        <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.professional ? (
                        <CheckCircle className="w-5 h-5 mx-auto text-primary" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.enterprise ? (
                        <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                      )}
                    </td>
                  </tr>
                ))}

                <tr className="border-t border-border">
                  <td className="px-6 py-4 font-medium" colSpan={4}>
                    Relatórios e Análises
                  </td>
                </tr>
                {[
                  {
                    name: "Dashboard básico",
                    starter: true,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    name: "Relatórios avançados",
                    starter: false,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    name: "Exportação de dados",
                    starter: false,
                    professional: true,
                    enterprise: true,
                  },
                  {
                    name: "Análise de performance",
                    starter: false,
                    professional: false,
                    enterprise: true,
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4 text-center">
                      {row.starter ? (
                        <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.professional ? (
                        <CheckCircle className="w-5 h-5 mx-auto text-primary" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.enterprise ? (
                        <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                      )}
                    </td>
                  </tr>
                ))}

                <tr className="border-t border-border">
                  <td className="px-6 py-4 font-medium" colSpan={4}>
                    Suporte e Integrações
                  </td>
                </tr>
                {[
                  {
                    name: "Suporte",
                    starter: "Email",
                    professional: "Prioritário",
                    enterprise: "24/7",
                  },
                  {
                    name: "API completa",
                    starter: false,
                    professional: false,
                    enterprise: true,
                  },
                  {
                    name: "Integrações",
                    starter: "Básicas",
                    professional: "Avançadas",
                    enterprise: "Customizadas",
                  },
                  {
                    name: "White label",
                    starter: false,
                    professional: false,
                    enterprise: true,
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                        )
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      {typeof row.professional === "boolean" ? (
                        row.professional ? (
                          <CheckCircle className="w-5 h-5 mx-auto text-primary" />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                        )
                      ) : (
                        row.professional
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                        )
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Incluído em todos os planos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Benefícios que fazem a diferença
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de quem escolheu o ToLivre
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Plano {testimonial.plan}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossos planos
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Ainda tem dúvidas? Estamos aqui para ajudar!
            </p>
            <Link href="/contato">
              <Button size="lg" variant="outline">
                Falar com Nossa Equipe
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-primary via-blue-500 to-purple-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Comece gratuitamente hoje
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Teste todos os recursos do plano Professional por 14 dias. Sem
            cartão de crédito, sem compromisso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
              >
                Começar Grátis Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Falar com Vendas
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/90">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>14 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Sem cartão</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t bg-card py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-xl font-bold">ToLivre</span>
              <p className="text-muted-foreground mt-4">
                Sistema completo de agendamentos para profissionais modernos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/recursos"
                    className="hover:text-primary transition-colors"
                  >
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/precos"
                    className="hover:text-primary transition-colors"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#demo"
                    className="hover:text-primary transition-colors"
                  >
                    Demonstração
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/sobre"
                    className="hover:text-primary transition-colors"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="hover:text-primary transition-colors"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/legal/privacidade"
                    className="hover:text-primary transition-colors"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/termos"
                    className="hover:text-primary transition-colors"
                  >
                    Termos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/seguranca"
                    className="hover:text-primary transition-colors"
                  >
                    Segurança
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 ToLivre. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
