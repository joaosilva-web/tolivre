"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Calendar,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Smartphone,
  Bell,
  CreditCard,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Lock,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "-10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroRef, heroVisible] = useScrollReveal();
  const [clientsRef, clientsVisible] = useScrollReveal();
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [multiRef, multiVisible] = useScrollReveal();
  const [stepsRef, stepsVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();
  const [pricingRef, pricingVisible] = useScrollReveal();
  const [testimonialsRef, testimonialsVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const revealClass = (visible: boolean) =>
    `scroll-reveal ${visible ? "scroll-reveal-visible" : ""}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <nav className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="TôLivre" width={32} height={32} />
            <span className="text-2xl font-bold text-primary">TôLivre</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Recursos
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Preços
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Depoimentos
            </Link>
            <Link
              href="/contato"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contato
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Começar grátis</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Recursos
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Preços
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Depoimentos
                </Link>
                <Link
                  href="/contato"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </Link>
                <div className="flex flex-col gap-2 pt-4 border-t border-border/40">
                  <Button variant="ghost" asChild>
                    <Link href="/login">Entrar</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/login">Começar grátis</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-20 pb-20 px-4 mt-16 min-h-[600px] bg-green-900"
        style={{
          backgroundImage: "url('/BG.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for text readability (subtle, to keep background visible) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/0"></div>

        {/* Decorative blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div
            ref={heroRef}
            className="flex flex-col items-center text-center space-y-8"
          >
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 fade-in-down ${heroVisible ? "visible" : ""}`}
            >
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-sm font-medium text-primary-foreground">
                Sistema de agendamento profissional
              </span>
            </div>

            {/* Title */}
            <h1
              className={`text-5xl md:text-7xl text-primary-foreground font-bold tracking-tight max-w-4xl fade-in-up delay-100 ${heroVisible ? "visible" : ""}`}
            >
              Agendamentos <span className="text-secondary">simplificados</span>{" "}
              para seu negócio
            </h1>

            {/* Subtitle */}
            <p
              className={`text-xl text-primary-foreground/60 max-w-2xl fade-in-up delay-200 ${heroVisible ? "visible" : ""}`}
            >
              Gerencie sua agenda, clientes e pagamentos em um só lugar. Sistema
              completo para salões, barbearias e profissionais autônomos.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mt-8 fade-in-scale delay-300 ${heroVisible ? "visible" : ""}`}
            >
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/login">
                  Começar grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                asChild
              >
                <Link href="/demonstracao">Ver demonstração</Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              className={`flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground fade-in-up delay-400 ${heroVisible ? "visible" : ""}`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-primary-foreground/60">
                  Teste grátis de 7 dias
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-primary-foreground/60">
                  Sem cartão de crédito
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-primary-foreground/60">
                  Suporte em português
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section ref={clientsRef} className="py-12 border-y bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <p
            className={`text-center text-sm text-muted-foreground mb-8 fade-in-down ${clientsVisible ? "visible" : ""}`}
          >
            Confiado por centenas de profissionais em todo Brasil
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-12 w-32 rounded bg-muted flex items-center justify-center fade-in-scale delay-${i * 100} ${clientsVisible ? "visible" : ""}`}
              >
                <span className="text-xs text-muted-foreground">
                  Cliente {i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Banking Reimagined Style */}
      <section ref={featuresRef} className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 fade-in-down ${featuresVisible ? "visible" : ""}`}
            >
              Agendamento reimaginado para o{" "}
              <span className="text-primary">seu futuro</span>
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-2xl mx-auto fade-in-up delay-100 ${featuresVisible ? "visible" : ""}`}
            >
              Todas as ferramentas que você precisa para gerenciar seu negócio
              de beleza
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const animationClass = [
                "fade-in-left",
                "fade-in-up",
                "fade-in-right",
                "fade-in-left",
                "fade-in-up",
                "fade-in-right",
              ][index % 6];
              const delayClass = `delay-${100 * ((index % 3) + 1)}`;

              return (
                <Card
                  key={index}
                  className={`group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 ${animationClass} ${delayClass} ${featuresVisible ? "visible" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Multi-Professional Section */}
      <section ref={multiRef} className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2
                className={`text-4xl md:text-5xl font-bold mb-6 fade-in-left ${multiVisible ? "visible" : ""}`}
              >
                Um sistema para{" "}
                <span className="text-primary">múltiplos profissionais</span>
              </h2>
              <p
                className={`text-xl text-muted-foreground mb-8 fade-in-left delay-100 ${multiVisible ? "visible" : ""}`}
              >
                Gerencie toda sua equipe em um só lugar. Controle de horários,
                comissões e muito mais.
              </p>

              <div className="space-y-4">
                {multiProfessionalFeatures.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 fade-in-left delay-${200 + index * 100} ${multiVisible ? "visible" : ""}`}
                  >
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className={`mt-8 rounded-full fade-in-scale delay-500 ${multiVisible ? "visible" : ""}`}
                asChild
              >
                <Link href="/login">Começar agora</Link>
              </Button>
            </div>

            <div className="relative">
              <Card
                className={`p-6 fade-in-right ${multiVisible ? "visible" : ""}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                      <div>
                        <div className="font-semibold">João Silva</div>
                        <div className="text-sm text-muted-foreground">
                          Barbeiro
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">R$ 2.450</div>
                      <div className="text-xs text-muted-foreground">
                        Este mês
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                      <div>
                        <div className="font-semibold">Maria Santos</div>
                        <div className="text-sm text-muted-foreground">
                          Cabeleireira
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">R$ 3.120</div>
                      <div className="text-xs text-muted-foreground">
                        Este mês
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                      <div>
                        <div className="font-semibold">Ana Costa</div>
                        <div className="text-sm text-muted-foreground">
                          Manicure
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">R$ 1.890</div>
                      <div className="text-xs text-muted-foreground">
                        Este mês
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section ref={stepsRef} className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 fade-in-down ${stepsVisible ? "visible" : ""}`}
            >
              Nosso sistema é{" "}
              <span className="text-primary">fácil de usar</span>
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-2xl mx-auto fade-in-up delay-100 ${stepsVisible ? "visible" : ""}`}
            >
              Comece a receber agendamentos em minutos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative fade-in-up delay-${100 * (index + 2)} ${stepsVisible ? "visible" : ""}`}
              >
                <div className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-primary-foreground mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-secondary"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-24 px-4 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center fade-in-scale delay-${100 * (index + 1)} ${statsVisible ? "visible" : ""}`}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 fade-in-down ${pricingVisible ? "visible" : ""}`}
            >
              Escolha um plano que{" "}
              <span className="text-primary">impulsione seu negócio</span>
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-2xl mx-auto fade-in-up delay-100 ${pricingVisible ? "visible" : ""}`}
            >
              Sem taxas ocultas. Cancele quando quiser.
            </p>
          </div>

          {/* Top 3 cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
            {pricing.slice(0, 3).map((plan, index) => {
              const animationClass = [
                "fade-in-left",
                "fade-in-scale",
                "fade-in-right",
              ][index];
              const delayClass = `delay-${100 * (index + 1)}`;

              // Pro Plus (popular) fica no meio com destaque extra
              const isPopular = plan.popular;

              return (
                <Card
                  key={index}
                  className={`relative ${
                    isPopular
                      ? "border-2 border-primary shadow-2xl md:scale-105 md:-mt-2 z-10"
                      : "border-border"
                  } ${animationClass} ${delayClass} ${pricingVisible ? "visible" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow-lg">
                      Mais popular
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        R$ {plan.price}
                      </span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      {plan.description}
                    </p>
                    <Button
                      className="w-full rounded-full"
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/login">Começar agora</Link>
                    </Button>
                    <div className="mt-6 space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Business plan centered below */}
          <div className="flex justify-center max-w-5xl mx-auto">
            <div className="w-full md:w-1/3">
              {pricing.slice(3).map((plan, index) => (
                <Card
                  key={index}
                  className={`relative border-border fade-in-scale delay-400 ${pricingVisible ? "visible" : ""}`}
                >
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        R$ {plan.price}
                      </span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      {plan.description}
                    </p>
                    <Button
                      className="w-full rounded-full"
                      variant="outline"
                      asChild
                    >
                      <Link href="/login">Começar agora</Link>
                    </Button>
                    <div className="mt-6 space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 fade-in-down ${testimonialsVisible ? "visible" : ""}`}
            >
              Feedback de{" "}
              <span className="text-primary">clientes satisfeitos</span>
            </h2>
            <p
              className={`text-xl text-muted-foreground fade-in-up delay-100 ${testimonialsVisible ? "visible" : ""}`}
            >
              Veja o que nossos usuários dizem sobre o TôLivre
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const animationClass = [
                "fade-in-left",
                "fade-in-up",
                "fade-in-right",
              ][index];
              const delayClass = `delay-${100 * (index + 2)}`;

              return (
                <Card
                  key={index}
                  className={`${animationClass} ${delayClass} ${testimonialsVisible ? "visible" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted"></div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={ctaRef}
        className="py-24 px-4 text-primary-foreground relative bg-primary"
        style={{
          backgroundImage: "url('/BG.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/0" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 fade-in-down ${ctaVisible ? "visible" : ""}`}
          >
            Impulsione sua liberdade financeira
          </h2>
          <p
            className={`text-xl mb-8 text-primary-foreground/90 fade-in-up delay-100 ${ctaVisible ? "visible" : ""}`}
          >
            Comece hoje mesmo a gerenciar seus agendamentos de forma
            profissional e aumente sua receita.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className={`rounded-full px-8 fade-in-scale delay-200 ${ctaVisible ? "visible" : ""}`}
            asChild
          >
            <Link href="/login">
              Criar conta grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="TôLivre" width={28} height={28} />
                <h3 className="text-2xl font-bold text-primary">TôLivre</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema completo de agendamento para profissionais de beleza e
                bem-estar.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/recursos"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/precos"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demonstracao"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Demonstração
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/sobre"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/termos"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/privacidade"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span>contato@tolivre.com</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>(11) 98765-4321</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-5 w-5 flex-shrink-0" />
                  <span>São Paulo, Brasil</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border">
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
                  href="/legal/cookies"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Data
const features = [
  {
    icon: Calendar,
    title: "Agenda Inteligente",
    description:
      "Sistema de agendamento com disponibilidade em tempo real e confirmações automáticas.",
  },
  {
    icon: Clock,
    title: "Horários Flexíveis",
    description:
      "Gerencie horários de trabalho, intervalos e exceções de forma simples.",
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description:
      "Mantenha histórico completo de serviços e preferências dos seus clientes.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Integrado",
    description: "Envie lembretes e confirmações automáticas via WhatsApp.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Detalhados",
    description:
      "Acompanhe receitas, agendamentos e desempenho da equipe em tempo real.",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description:
      "Seus dados protegidos com criptografia e backups automáticos.",
  },
];

const multiProfessionalFeatures = [
  {
    title: "Controle total da equipe",
    description:
      "Gerencie agendas individuais e visualize disponibilidade em tempo real.",
  },
  {
    title: "Sistema de comissões",
    description:
      "Calcule automaticamente comissões e pagamentos de cada profissional.",
  },
  {
    title: "Relatórios por profissional",
    description: "Acompanhe o desempenho individual com métricas detalhadas.",
  },
];

const steps = [
  {
    title: "Cadastre-se",
    description: "Crie sua conta grátis em menos de 2 minutos",
  },
  {
    title: "Configure",
    description: "Adicione seus serviços, horários e profissionais",
  },
  {
    title: "Compartilhe",
    description: "Envie seu link de agendamento para os clientes",
  },
  {
    title: "Receba",
    description: "Comece a receber agendamentos automaticamente",
  },
];

const stats = [
  { value: "5.000+", label: "Agendamentos realizados" },
  { value: "500+", label: "Profissionais ativos" },
  { value: "4.9★", label: "Avaliação média" },
  { value: "98%", label: "Satisfação dos clientes" },
];

const pricing = [
  {
    name: "Básico",
    price: "29,90",
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
    price: "59,90",
    description: "Ideal para pequenos salões e barbearias",
    popular: false,
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
    price: "99,90",
    description: "Para salões em crescimento",
    popular: true,
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
    price: "149,90",
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

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Dono de Barbearia",
    content:
      "O TôLivre transformou completamente meu negócio. Agora consigo gerenciar 4 barbeiros com facilidade e minhas receitas aumentaram 40%.",
  },
  {
    name: "Ana Paula",
    role: "Cabeleireira",
    content:
      "Nunca foi tão fácil organizar minha agenda. Os lembretes automáticos reduziram drasticamente as faltas dos clientes.",
  },
  {
    name: "Roberto Santos",
    role: "Salão de Beleza",
    content:
      "Sistema completo e intuitivo. A página de agendamento online trouxe muitos clientes novos para meu salão.",
  },
];
