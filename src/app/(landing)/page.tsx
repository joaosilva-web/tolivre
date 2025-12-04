"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-title", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 80,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });

      // Features animation with scroll trigger
      const features = gsap.utils.toArray(".feature-card");
      features.forEach((feature: any, index) => {
        gsap.from(feature, {
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 100,
          rotation: 5,
          duration: 1,
          delay: index * 0.1,
          ease: "power3.out",
        });
      });

      // Stats animation
      const statItems = gsap.utils.toArray(".stat-item");
      statItems.forEach((stat: any) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      });

      // CTA section animation
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
      });

      // Parallax effect for background elements
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        y: (i, target) =>
          -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

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

      {/* Navigation */}
      <nav className="relative z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                ToLivre
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="hero-title text-6xl md:text-8xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
                Agendamentos
              </span>
              <span className="block">Sem Limites</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Transforme sua gestão de agendamentos com inteligência artificial,
              integração WhatsApp e uma experiência única para seus clientes.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10k+", label: "Agendamentos/Mês", icon: Calendar },
              { number: "500+", label: "Empresas Ativas", icon: Users },
              { number: "99.9%", label: "Uptime", icon: TrendingUp },
              { number: "24/7", label: "Suporte", icon: Clock },
            ].map((stat, index) => (
              <div key={index} className="stat-item relative group">
                <div className="bg-card border rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground mt-2">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Recursos que <span className="text-primary">Impressionam</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar seus agendamentos de forma
              profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Integração WhatsApp",
                description:
                  "Envie confirmações e lembretes automáticos direto no WhatsApp dos seus clientes.",
                gradient: "from-green-500 to-emerald-600",
              },
              {
                icon: Calendar,
                title: "Agenda Inteligente",
                description:
                  "Sistema inteligente que otimiza seus horários e evita conflitos automaticamente.",
                gradient: "from-blue-500 to-cyan-600",
              },
              {
                icon: Users,
                title: "Gestão de Clientes",
                description:
                  "Mantenha todo histórico, preferências e informações dos seus clientes organizados.",
                gradient: "from-purple-500 to-pink-600",
              },
              {
                icon: Clock,
                title: "Horários Flexíveis",
                description:
                  "Configure seus horários de trabalho e bloqueie períodos com total flexibilidade.",
                gradient: "from-orange-500 to-red-600",
              },
              {
                icon: TrendingUp,
                title: "Relatórios Avançados",
                description:
                  "Acompanhe métricas, tendências e performance do seu negócio em tempo real.",
                gradient: "from-yellow-500 to-orange-600",
              },
              {
                icon: CheckCircle,
                title: "Multi-usuário",
                description:
                  "Gerencie múltiplos profissionais e serviços em uma única plataforma.",
                gradient: "from-indigo-500 to-purple-600",
              },
            ].map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="relative bg-card border rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <div className="relative">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="cta-content relative bg-gradient-to-r from-primary via-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Pronto para Decolar?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de profissionais que já transformaram sua
                gestão de agendamentos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 py-6"
                  >
                    Começar Grátis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    Já tenho conta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t bg-card py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">ToLivre</span>
              </div>
              <p className="text-muted-foreground">
                Sistema completo de agendamentos para profissionais modernos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
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
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
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
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Termos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
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
