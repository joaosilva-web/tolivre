"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import IconLogo from "@/components/ui/icon-logo";
import Image from "next/image";
import {
  Calendar,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

import LaunchCountdown from "../components/launch-countdown";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const targetAudienceRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const integrationsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const guaranteesRef = useRef<HTMLDivElement>(null);
  const ctaIntermediateRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const navItems: {
    label: string;
    ref: { current?: HTMLElement | null } | null;
  }[] = [
    { label: "Início", ref: heroRef },
    { label: "Funcionalidades", ref: featuresRef },
    { label: "Integrações", ref: integrationsRef },
    { label: "Preços", ref: pricingRef },
    { label: "Contato", ref: ctaRef },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  function scrollToRef(ref: { current?: HTMLElement | null } | null) {
    const el = ref && ref.current ? ref.current : null;
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      window.scrollTo({
        top: (el as HTMLElement).offsetTop || 0,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    // Loading screen animation
    const loadingTimeline = gsap.timeline({
      onComplete: () => setLoading(false),
    });

    loadingTimeline
      .to(".loading-logo", {
        scale: 1.2,
        duration: 0.6,
        ease: "power2.inOut",
        repeat: 1,
        yoyo: true,
      })
      .to(".loading-screen", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.5,
      });

    const ctx = gsap.context(() => {
      // Hero animations - more emotion and interactivity
      const heroTimeline = gsap.timeline();

      heroTimeline
        .from(".hero-title span", {
          opacity: 0,
          y: 150,
          rotationX: -90,
          transformOrigin: "50% 50%",
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)",
        })
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .from(
          ".hero-badge",
          {
            opacity: 0,
            scale: 0,
            rotation: 180,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=0.4"
        );

      // Mouse move parallax effect for hero
      const heroSection = heroRef.current;
      if (heroSection) {
        heroSection.addEventListener("mousemove", (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } =
            heroSection.getBoundingClientRect();
          const x = (clientX - left) / width - 0.5;
          const y = (clientY - top) / height - 0.5;

          gsap.to(".hero-title", {
            x: x * 30,
            y: y * 20,
            rotationY: x * 5,
            rotationX: -y * 5,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(".hero-subtitle", {
            x: x * 20,
            y: y * 15,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(".parallax-bg", {
            x: x * 50,
            y: y * 50,
            duration: 0.8,
            ease: "power2.out",
          });
        });
      }

      // Features animation with exit
      const features = gsap.utils.toArray(".feature-card");
      features.forEach((feature: any, index) => {
        gsap.fromTo(
          feature,
          {
            opacity: 0,
            y: 100,
            rotation: 5,
            scale: 0.8,
          },
          {
            scrollTrigger: {
              trigger: feature,
              start: "top 80%",
              end: "top 10%",
              toggleActions: "play reverse play reverse",
              scrub: 0.5,
            },
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
          }
        );
      });

      // Stats animation with exit
      const statItems = gsap.utils.toArray(".stat-item");
      statItems.forEach((stat: any, index) => {
        gsap.fromTo(
          stat,
          {
            opacity: 0,
            scale: 0.5,
            rotation: 360,
          },
          {
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play reverse play reverse",
              scrub: 0.3,
            },
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: "back.out(1.7)",
          }
        );
      });

      // Target Audience animation with exit
      const targetCards = gsap.utils.toArray(".target-card");
      targetCards.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 10%",
              toggleActions: "play reverse play reverse",
              scrub: 0.5,
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.15,
            ease: "power3.out",
          }
        );
      });

      // Testimonials animation with exit
      const testimonials = gsap.utils.toArray(".testimonial-card");
      testimonials.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            rotationZ: index % 2 === 0 ? -15 : 15,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top 50%",
              toggleActions: "play reverse play reverse",
              scrub: 0.3,
            },
            opacity: 1,
            x: 0,
            rotationZ: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      });

      // Demo/Screenshots animation with exit
      gsap.fromTo(
        ".demo-content",
        {
          opacity: 0,
          scale: 0.8,
          rotationY: -30,
        },
        {
          scrollTrigger: {
            trigger: demoRef.current,
            start: "top 80%",
            end: "top 10%",
            toggleActions: "play reverse play reverse",
            scrub: 1,
          },
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Comparison table animation with exit
      const comparisonRows = gsap.utils.toArray(".comparison-row");
      comparisonRows.forEach((row: any, index) => {
        gsap.fromTo(
          row,
          {
            opacity: 0,
            x: -50,
            backgroundColor: "rgba(0,0,0,0)",
          },
          {
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play reverse play reverse",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
          }
        );
      });

      // Integrations animation with exit - adjusted timing
      const integrationLogos = gsap.utils.toArray(".integration-logo");
      integrationLogos.forEach((logo: any, index) => {
        gsap.fromTo(
          logo,
          {
            opacity: 0,
            scale: 0,
            rotation: 180,
          },
          {
            scrollTrigger: {
              trigger: integrationsRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.08,
            ease: "back.out(1.7)",
          }
        );
      });

      // Roadmap timeline animation with exit
      const roadmapItems = gsap.utils.toArray(".roadmap-item");
      roadmapItems.forEach((item: any, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play reverse play reverse",
              scrub: 0.5,
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
          }
        );
      });

      // Counter animation with exit
      const counters = document.querySelectorAll(".counter-number");
      counters.forEach((counter: any) => {
        const target = parseInt(counter.getAttribute("data-target"));
        gsap.fromTo(
          counter,
          {
            innerText: 0,
            scale: 0.5,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play reverse play reverse",
              scrub: 1,
            },
            innerText: target,
            scale: 1,
            opacity: 1,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power1.out",
            onUpdate: function () {
              counter.innerText = Math.ceil(counter.innerText);
            },
          }
        );
      });

      // Trust badges animation with exit
      const trustBadges = gsap.utils.toArray(".trust-badge");
      trustBadges.forEach((badge: any, index) => {
        gsap.fromTo(
          badge,
          {
            opacity: 0,
            y: 30,
            rotationX: -90,
          },
          {
            scrollTrigger: {
              trigger: badge,
              start: "top 85%",
              end: "top 45%",
              toggleActions: "play reverse play reverse",
              scrub: 0.5,
            },
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
          }
        );
      });

      // Team members animation with exit
      const teamMembers = gsap.utils.toArray(".team-member");
      teamMembers.forEach((member: any, index) => {
        gsap.fromTo(
          member,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
            rotationY: 45,
          },
          {
            scrollTrigger: {
              trigger: member,
              start: "top 75%",
              end: "top 50%",
              toggleActions: "play reverse play reverse",
              scrub: 0.3,
            },
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "power3.out",
          }
        );
      });

      // Pricing cards animation with exit
      const pricingCards = gsap.utils.toArray(".pricing-card");
      pricingCards.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
            rotationZ: index === 1 ? 0 : index === 0 ? -10 : 10,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 10%",
              toggleActions: "play reverse play reverse",
              scrub: 0.5,
            },
            opacity: 1,
            y: 0,
            scale: 1,
            rotationZ: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "power3.out",
          }
        );
      });

      // CTA section animation with exit
      gsap.fromTo(
        ".cta-content",
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
            scrub: 0.5,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      );

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
    <>
      {/* Loading Screen */}
      {loading && (
        <div className="loading-screen fixed inset-0 z-[9999] flex items-center justify-center bg-background">
          <div className="loading-logo w-[200px] h-[200px]">
            <IconLogo width="100%" height="100%" />
          </div>
        </div>
      )}

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
        <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div style={{ width: 32, height: 32 }}>
                  <IconLogo />
                </div>
                <span className="text-2xl font-bold">TôLivre</span>
              </div>
              <div className="hidden md:flex md:flex-1 md:justify-center justify-center items-center">
                <div className="flex items-center gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollToRef(item.ref)}
                      className="text-md text-text hover:text-primary transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Mobile hamburger */}
                <div className="md:hidden">
                  <button
                    aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                    onClick={() => setMobileOpen((v) => !v)}
                    className="p-2 rounded-md bg-transparent hover:bg-surface/5"
                  >
                    {mobileOpen ? (
                      <X className="w-6 h-6 text-foreground" />
                    ) : (
                      <Menu className="w-6 h-6 text-foreground" />
                    )}
                  </button>
                </div>

                {/* Buttons visible only on md+ */}
                <div className="hidden md:flex items-center gap-4">
                  <Link href="/login">
                    <Button variant="ghost">Entrar</Button>
                  </Link>
                  <Link href="/login?tab=register">
                    <Button className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90">
                      Começar Grátis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Spacer to offset fixed header height */}
        <div className="h-16" aria-hidden />

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div className="md:hidden absolute left-0 right-0 top-[64px] z-40 bg-background border-b shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setMobileOpen(false);
                    scrollToRef(item.ref);
                  }}
                  className="text-left w-full text-lg text-foreground py-2"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 border-t mt-2 flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link href="/login?tab=register">
                  <Button className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90">
                    Começar Grátis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-20 px-4 h-screen"
          style={{
            perspective: "1000px",
            backgroundImage: "url('/hero-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay between background and text: transparent top -> white bottom */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
            }}
          />

          <div className="max-w-7xl mx-auto relative z-20">
            <LaunchCountdown heroRef={heroRef} />
            <div className="text-center space-y-6">
              <h1 className="hero-title text-3xl md:text-4xl font-bold leading-tight">
                Se liberte da sua agenda. Ganhe tempo de verdade.
              </h1>

              <p className="hero-subtitle text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Agendamentos confirmados automaticamente. Menos faltas, mais
                pontualidade, tudo em um só sistema.
              </p>

              <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/login?tab=register">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-5 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-all duration-300"
                  >
                    Começar grátis
                  </Button>
                </Link>
                <Link href="/demonstracao">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-5 hover:scale-105 transition-all duration-300"
                  >
                    Ver como funciona
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="hero-badge flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3 hover:scale-110 transition-all duration-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold">14 dias grátis</span>
                </div>
                <div className="hero-badge flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3 hover:scale-110 transition-all duration-300">
                  <Image src="/logo.svg" alt="TôLivre" width={18} height={18} />
                  <span className="text-sm font-semibold">
                    Confirmação automática (WhatsApp)
                  </span>
                </div>
                <div className="hero-badge flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3 hover:scale-110 transition-all duration-300">
                  <Image src="/logo.svg" alt="TôLivre" width={18} height={18} />
                  <span className="text-sm font-semibold">
                    Agendamento 24/7 com confirmação
                  </span>
                </div>
              </div>
              {/* Down arrow CTA (pulse animation) */}
              <div className="mt-8 flex justify-center">
                <button
                  aria-label="Ver funcionalidades"
                  onClick={() => scrollToRef(featuresRef)}
                  className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
                  style={{ zIndex: 30 }}
                >
                  <ChevronDown
                    className="w-6 h-6 text-primary"
                    style={{
                      animation: "pulseScale 1.6s infinite ease-in-out",
                    }}
                  />
                </button>
              </div>

              <style>{`@keyframes pulseScale { 0% { transform: translateY(0) scale(1); opacity:1 } 50% { transform: translateY(6px) scale(0.98); opacity:0.85 } 100% { transform: translateY(0) scale(1); opacity:1 } }`}</style>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "80%", label: "Menos No-Shows", icon: CheckCircle },
                { number: "5h/sem", label: "Tempo Economizado", icon: Clock },
                {
                  number: "24/7",
                  label: "Agendamentos Online",
                  icon: Calendar,
                },
                { number: "100%", label: "Automático", icon: TrendingUp },
              ].map((stat, index) => (
                <div key={index} className="stat-item relative group">
                  <div className="bg-card border rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground mt-2">
                      {stat.label}
                    </div>
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
                Funcionalidades <span className="text-primary">Completas</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tudo que você precisa para automatizar sua agenda e focar no que
                realmente importa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageCircle,
                  title: "Confirmação automática (WhatsApp) e lembretes",
                  description:
                    "Confirme presença e reduza no-shows em até 80% com confirmações automáticas e lembretes por WhatsApp. Seus clientes recebem aviso e confirmação em tempo real.",
                  gradient: "from-green-500 to-emerald-600",
                },
                {
                  icon: Calendar,
                  title: "Agendamento 24/7",
                  description:
                    "Seus clientes podem agendar a qualquer hora do dia, e recebem confirmação instantânea por WhatsApp. Nunca perca uma venda.",
                  gradient: "from-blue-500 to-cyan-600",
                },
                {
                  icon: Users,
                  title: "Gestão de Clientes",
                  description:
                    "Histórico completo de agendamentos, preferências e informações. Atendimento personalizado que fideliza.",
                  gradient: "from-purple-500 to-pink-600",
                },
                {
                  icon: Clock,
                  title: "Horários de Trabalho",
                  description:
                    "Configure seus horários disponíveis, bloqueie períodos e crie exceções. Total controle sobre sua agenda.",
                  gradient: "from-orange-500 to-red-600",
                },
                {
                  icon: TrendingUp,
                  title: "Relatórios Financeiros",
                  description:
                    "Acompanhe faturamento, serviços mais vendidos e performance. Tome decisões baseadas em dados reais.",
                  gradient: "from-yellow-500 to-orange-600",
                },
                {
                  icon: CheckCircle,
                  title: "Múltiplos Profissionais",
                  description:
                    "Gerencie toda sua equipe em uma única plataforma. Controle de comissões, horários e serviços por profissional.",
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
                      <h3 className="text-2xl font-bold mb-3">
                        {feature.title}
                      </h3>
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

        {/* Target Audience Section */}
        <section
          ref={targetAudienceRef}
          className="py-32 px-6 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Para quem é o <span className="text-primary">TôLivre</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Profissionais de serviço que querem economizar tempo, reduzir
                no-shows e crescer com organização profissional
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "💇",
                  title: "Salões & Barbearias",
                  description:
                    "Cabeleireiros, manicures, barbeiros e estéticas. Gerencie múltiplos profissionais, serviços e horários em um só lugar.",
                  benefits: [
                    "80% menos no-shows",
                    "Agendamentos 24/7",
                    "Controle de comissões",
                  ],
                },
                {
                  icon: "🏥",
                  title: "Clínicas & Consultórios",
                  description:
                    "Médicos, dentistas, psicólogos e terapeutas. Confirmação automática (WhatsApp), gestão de pacientes e histórico completo.",
                  benefits: [
                    "Confirmação automática (WhatsApp)",
                    "Histórico de consultas",
                    "5h/semana economizadas",
                  ],
                },
                {
                  icon: "💪",
                  title: "Personal Trainers",
                  description:
                    "Profissionais de educação física e wellness. Controle de treinos, pagamentos e evolução dos seus alunos.",
                  benefits: [
                    "Agenda de treinos",
                    "Gestão de pacotes",
                    "Pagamentos recorrentes",
                  ],
                },
                {
                  icon: "🎓",
                  title: "Professores & Aulas",
                  description:
                    "Idiomas, música, reforço escolar e mais. Organize horários, alunos e pagamentos em um só lugar.",
                  benefits: [
                    "Controle de mensalidades",
                    "Múltiplos alunos",
                    "Histórico de aulas",
                  ],
                },
                {
                  icon: "⚖️",
                  title: "Profissionais Liberais",
                  description:
                    "Advogados, contadores, consultores e arquitetos. Agende reuniões e consultas sem complicação.",
                  benefits: [
                    "Agenda profissional",
                    "Link personalizado",
                    "Relatórios financeiros",
                  ],
                },
                {
                  icon: "🐾",
                  title: "Pet Shops e Veterinários",
                  description:
                    "Banho, tosa, consultas veterinárias e mais. Mantenha o histórico completo de cada pet e seus tutores.",
                  benefits: [
                    "Ficha do pet",
                    "Vacinas em dia",
                    "Tutores informados",
                  ],
                },
              ].map((target, idx) => (
                <div key={idx} className="target-card group">
                  <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {target.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{target.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {target.description}
                    </p>
                    <div className="space-y-2">
                      {target.benefits.map((benefit, benefitIdx) => (
                        <div
                          key={benefitIdx}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 border border-primary/20 rounded-2xl p-8 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Seu negócio não está na lista?
                </h3>
                <p className="text-muted-foreground mb-6">
                  O TôLivre é perfeito para{" "}
                  <strong>qualquer profissional ou empresa</strong> que trabalha
                  com agendamentos. Se você marca horários com clientes, nós
                  temos a solução ideal para você!
                </p>
                <Link href="/login?tab=register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
                  >
                    Experimente Grátis por 14 dias
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          ref={testimonialsRef}
          className="py-32 px-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-500/5 to-background" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
                O que nossos clientes dizem
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Histórias reais de transformação e crescimento
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Maria Silva",
                  role: "Proprietária - Salão Bella Donna",
                  avatar: "MS",
                  rating: 5,
                  text: "O TôLivre revolucionou nossa forma de agendar. Reduzimos cancelamentos em 40% e nossos clientes adoram a praticidade!",
                },
                {
                  name: "Carlos Mendes",
                  role: "Gerente - Clínica Med+",
                  avatar: "CM",
                  rating: 5,
                  text: "A integração com WhatsApp foi um divisor de águas. Nossos pacientes recebem confirmação automática e lembretes, e nunca mais tivemos horários vagos.",
                },
                {
                  name: "Ana Costa",
                  role: "Personal Trainer",
                  avatar: "AC",
                  rating: 5,
                  text: "Profissional e super intuitivo! Consigo gerenciar meus 50+ clientes sem qualquer dificuldade. Recomendo muito!",
                },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="testimonial-card bg-card border border-border/50 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ★
                      </span>
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

        {/* Demo/Screenshots Section */}
        <section
          ref={demoRef}
          className="py-32 px-6 relative overflow-hidden bg-muted/30"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Interface intuitiva e poderosa
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Veja como é fácil gerenciar seus agendamentos
              </p>
            </div>

            <div className="demo-content max-w-5xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-border/30 bg-gradient-to-br from-primary/10 to-purple-500/10">
                <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                  <div className="text-center p-12">
                    <Calendar className="w-24 h-24 mx-auto mb-6 text-primary" />
                    <p className="text-2xl font-semibold text-white mb-2">
                      Dashboard TôLivre
                    </p>
                    <p className="text-muted-foreground">
                      Visualização em tempo real dos seus agendamentos
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: MessageCircle,
                    title: "WhatsApp Integrado",
                    desc: "Notificações automáticas",
                  },
                  {
                    icon: Calendar,
                    title: "Calendário Sincronizado",
                    desc: "Nunca perca um compromisso",
                  },
                  {
                    icon: Users,
                    title: "Gestão de Clientes",
                    desc: "Histórico completo",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all"
                  >
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section
          ref={comparisonRef}
          className="py-32 px-6 relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Por que escolher TôLivre?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Feito para o mercado brasileiro de serviços
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Funcionalidade
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      TôLivre
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                      Calendly
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                      Booksy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "WhatsApp Integrado",
                      tolivre: true,
                      calendly: false,
                      booksy: false,
                    },
                    {
                      name: "Preço em Reais",
                      tolivre: true,
                      calendly: false,
                      booksy: true,
                    },
                    {
                      name: "Suporte em Português",
                      tolivre: true,
                      calendly: false,
                      booksy: true,
                    },
                    {
                      name: "Agendamento 24/7",
                      tolivre: true,
                      calendly: true,
                      booksy: true,
                    },
                    {
                      name: "Gestão de Comissões",
                      tolivre: true,
                      calendly: false,
                      booksy: true,
                    },
                    {
                      name: "Página Pública Personalizada",
                      tolivre: true,
                      calendly: true,
                      booksy: true,
                    },
                    {
                      name: "A partir de R$ 69,90/mês",
                      tolivre: true,
                      calendly: false,
                      booksy: false,
                    },
                    {
                      name: "Sem Taxa de Setup",
                      tolivre: true,
                      calendly: true,
                      booksy: false,
                    },
                  ].map((feature, idx) => (
                    <tr
                      key={idx}
                      className="comparison-row border-t border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4">{feature.name}</td>
                      <td className="px-6 py-4 text-center">
                        {feature.tolivre ? (
                          <CheckCircle className="w-6 h-6 mx-auto text-green-500" />
                        ) : (
                          <span className="text-3xl text-red-500/40">×</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {feature.calendly ? (
                          <CheckCircle className="w-6 h-6 mx-auto text-green-500/40" />
                        ) : (
                          <span className="text-3xl text-red-500/40">×</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {feature.booksy ? (
                          <CheckCircle className="w-6 h-6 mx-auto text-green-500/40" />
                        ) : (
                          <span className="text-3xl text-red-500/40">×</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 text-center">
                  💡 Por que o TôLivre é diferente?
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Calendly</strong> - Focado em reuniões
                        corporativas (US$ 10-16/assento). Não tem gestão de
                        comissões nem integração WhatsApp nativa.
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Booksy</strong> - Plataforma internacional de
                        marketplace. Cobra taxas de transação e setup. Menos
                        flexível para personalização.
                      </span>
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>TôLivre</strong> - Criado especificamente para o
                        mercado brasileiro. WhatsApp integrado, preços em reais,
                        suporte local.
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong>Melhor custo-benefício</strong> - A partir de R$
                        69,90/mês com todas as funcionalidades essenciais
                        incluídas.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section
          ref={integrationsRef}
          className="py-32 px-6 relative overflow-hidden bg-muted/30"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Integrações poderosas
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Conecte-se com as ferramentas que você já usa
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "WhatsApp", color: "from-green-500 to-green-600" },
                { name: "Google Calendar", color: "from-blue-500 to-blue-600" },
                { name: "Stripe", color: "from-purple-500 to-purple-600" },
                { name: "Zoom", color: "from-blue-400 to-blue-500" },
                { name: "Instagram", color: "from-pink-500 to-orange-500" },
                { name: "Facebook", color: "from-blue-600 to-blue-700" },
                { name: "Mailchimp", color: "from-yellow-500 to-yellow-600" },
                { name: "Zapier", color: "from-orange-500 to-red-500" },
              ].map((integration, idx) => (
                <div key={idx} className="integration-logo">
                  <div
                    className={`bg-gradient-to-br ${integration.color} rounded-2xl p-8 h-32 flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                  >
                    <span className="text-white font-bold text-lg text-center">
                      {integration.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline/Roadmap Section */}
        <section
          ref={timelineRef}
          className="py-32 px-6 relative overflow-hidden"
        >
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Nossa Jornada
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                O que já fizemos e para onde vamos
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-purple-500 to-primary/20" />

              {[
                {
                  status: "Em Desenvolvimento",
                  title: "Desenvolvimento da Plataforma",
                  desc: "Sistema completo de agendamentos online em fase final de testes",
                  date: "Dez 2025",
                },
                {
                  status: "Planejado",
                  title: "Lançamento Oficial",
                  desc: "Abertura da plataforma para o público com plano gratuito de 14 dias",
                  date: "01 Jan 2026",
                },
                {
                  status: "Planejado",
                  title: "Apps Mobile",
                  desc: "Apps nativos para iOS e Android com todas as funcionalidades",
                  date: "Mar 2026",
                },
                {
                  status: "Planejado",
                  title: "Pagamentos Online",
                  desc: "Integração com gateways de pagamento (Stripe, PagSeguro, Mercado Pago)",
                  date: "Mai 2026",
                },
                {
                  status: "Planejado",
                  title: "Email Marketing",
                  desc: "Ferramenta de campanhas de email integrada na plataforma",
                  date: "Jul 2026",
                },
                {
                  status: "Futuro",
                  title: "IA e Automação Avançada",
                  desc: "Inteligência artificial para predição de demanda e otimização automática",
                  date: "2027",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`roadmap-item relative mb-16 ${
                    idx % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:text-right"
                  }`}
                >
                  <div
                    className={`flex ${
                      idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <div className="bg-card border border-border rounded-xl p-6 max-w-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        {item.status === "Concluído" ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : item.status === "Em Desenvolvimento" ? (
                          <Clock className="w-6 h-6 text-blue-500" />
                        ) : (
                          <TrendingUp className="w-6 h-6 text-purple-500" />
                        )}
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            item.status === "Concluído"
                              ? "bg-green-500/20 text-green-500"
                              : item.status === "Em Desenvolvimento"
                              ? "bg-blue-500/20 text-blue-500"
                              : "bg-purple-500/20 text-purple-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground mb-3">{item.desc}</p>
                      <p className="text-sm text-primary font-semibold">
                        {item.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Counter Statistics Section */}
        <section
          ref={counterRef}
          className="py-32 px-6 relative overflow-hidden bg-gradient-to-br from-primary via-blue-500 to-purple-500"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-4 gap-12 text-center text-white">
              {[
                {
                  target: 15000,
                  label: "Agendamentos Realizados",
                  suffix: "+",
                },
                { target: 500, label: "Clientes Ativos", suffix: "+" },
                { target: 98, label: "Satisfação", suffix: "%" },
                { target: 2000, label: "Horas Economizadas", suffix: "h" },
              ].map((stat, idx) => (
                <div key={idx} className="counter-stat">
                  <div className="text-6xl font-bold mb-4">
                    <span className="counter-number" data-target={stat.target}>
                      0
                    </span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-xl text-white/90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intermediate CTA Section */}
        <section
          ref={ctaIntermediateRef}
          className="py-32 px-6 relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Junte-se a centenas de profissionais que já transformaram sua
              gestão de agendamentos
            </p>

            <div className="bg-card border border-border rounded-2xl p-8 max-w-md mx-auto shadow-xl">
              <h3 className="text-2xl font-bold mb-6">
                Teste grátis por 14 dias
              </h3>
              <div className="space-y-4">
                <Link href="/login?tab=register" className="w-full">
                  <Button size="lg" className="w-full text-lg">
                    Começar agora <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Sem necessidade de cartão de crédito • Cancele quando quiser
              </p>
            </div>
          </div>
        </section>

        {/* Guarantees/Trust Section */}
        <section
          ref={guaranteesRef}
          className="py-32 px-6 relative overflow-hidden bg-muted/30"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Sua confiança é nossa prioridade
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Compromissos que garantem sua tranquilidade
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: CheckCircle,
                  title: "99.9% Uptime",
                  desc: "Garantia de disponibilidade. Seu negócio nunca para.",
                  color: "text-green-500",
                },
                {
                  icon: Clock,
                  title: "Suporte 24/7",
                  desc: "Equipe sempre disponível para te ajudar, quando precisar.",
                  color: "text-blue-500",
                },
                {
                  icon: CheckCircle,
                  title: "Certificado SSL",
                  desc: "Criptografia de ponta a ponta. Seus dados 100% seguros.",
                  color: "text-purple-500",
                },
                {
                  icon: CheckCircle,
                  title: "LGPD Compliant",
                  desc: "Totalmente adequado à Lei Geral de Proteção de Dados.",
                  color: "text-orange-500",
                },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="trust-badge bg-card border border-border rounded-xl p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <badge.icon
                    className={`w-16 h-16 mx-auto mb-4 ${badge.color}`}
                  />
                  <h4 className="font-bold text-xl mb-3">{badge.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Também garantimos:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "30 dias de garantia",
                  "Migração gratuita",
                  "Treinamento incluído",
                  "Backup diário",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-primary/10 border border-primary/30 rounded-full px-6 py-2 text-sm font-semibold"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section ref={teamRef} className="py-32 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Conheça nosso time
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Pessoas apaixonadas por tecnologia e atendimento
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "João Silva",
                  role: "CEO & Fundador",
                  avatar: "JS",
                  desc: "10+ anos em SaaS",
                },
                {
                  name: "Maria Santos",
                  role: "CTO",
                  avatar: "MS",
                  desc: "Ex-Google Engineer",
                },
                {
                  name: "Pedro Costa",
                  role: "Head de Produto",
                  avatar: "PC",
                  desc: "Design Thinking Expert",
                },
                {
                  name: "Ana Oliveira",
                  role: "Customer Success",
                  avatar: "AO",
                  desc: "Especialista em CX",
                },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="team-member bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="h-64 bg-gradient-to-br from-primary via-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-6xl font-bold">
                      {member.avatar}
                    </span>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-bold text-xl mb-2">{member.name}</h4>
                    <p className="text-primary font-semibold mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Pricing Section */}
        <section ref={pricingRef} className="relative py-20 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">
                Planos que{" "}
                <span className="text-primary">Crescem com Você</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Escolha o plano ideal para o seu negócio. Sem taxas escondidas,
                sem surpresas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <div className="pricing-card group">
                <div className="relative bg-card border rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Básico</h3>
                    <p className="text-muted-foreground">
                      Ideal para autônomos
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">R$ 69,90</span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      14 dias de teste grátis
                    </p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Agendamentos ilimitados</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>1 profissional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Gestão de clientes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Calendário semanal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Suporte por email</span>
                    </li>
                  </ul>
                  <Link href="/login?tab=register" className="w-full">
                    <Button variant="outline" className="w-full" size="lg">
                      Começar Teste Grátis
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Professional Plan - Popular */}
              <div className="pricing-card group">
                <div className="relative bg-card border-2 border-primary rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-primary/20">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Profissional</h3>
                    <p className="text-muted-foreground">
                      Para pequenas equipes
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        R$ 99,90
                      </span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      14 dias de teste grátis
                    </p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium">Tudo do Básico +</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium">Até 3 profissionais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium">Integração WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Lembretes automáticos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Relatórios e estatísticas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Página pública de agendamento</span>
                    </li>
                  </ul>
                  <Link href="/login?tab=register" className="w-full">
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-blue-600"
                      size="lg"
                    >
                      Começar Teste Grátis
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="pricing-card group">
                <div className="relative bg-card border rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Business</h3>
                    <p className="text-muted-foreground">
                      Para grandes operações
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">R$ 169,90</span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      14 dias de teste grátis
                    </p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                      <span className="font-medium">
                        Tudo do Profissional +
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                      <span className="font-medium">
                        Profissionais ilimitados
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                      <span>Sistema de comissões</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                      <span>Fotos dos profissionais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                      <span>Notificações em tempo real</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                      <span>Suporte 24/7</span>
                    </li>
                  </ul>
                  <Link href="/login?tab=register" className="w-full">
                    <Button variant="outline" className="w-full" size="lg">
                      Começar Teste Grátis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20 max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">
                  Perguntas Frequentes
                </h3>
              </div>
              <div className="space-y-6">
                <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-semibold text-lg mb-2">
                    Posso mudar de plano a qualquer momento?
                  </h4>
                  <p className="text-muted-foreground">
                    Sim! Você pode fazer upgrade ou downgrade do seu plano a
                    qualquer momento. As mudanças são aplicadas imediatamente e
                    o valor é ajustado proporcionalmente.
                  </p>
                </div>
                <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-semibold text-lg mb-2">
                    Como funciona a cobrança?
                  </h4>
                  <p className="text-muted-foreground">
                    A cobrança é feita mensalmente via cartão de crédito ou
                    boleto bancário. Você recebe uma fatura alguns dias antes da
                    data de renovação.
                  </p>
                </div>
                <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-semibold text-lg mb-2">
                    Preciso de cartão de crédito no plano gratuito?
                  </h4>
                  <p className="text-muted-foreground">
                    Não! O plano Starter é totalmente gratuito e não requer
                    cadastro de cartão de crédito. Você só precisará informar
                    dados de pagamento se decidir fazer upgrade.
                  </p>
                </div>
                <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
                  <h4 className="font-semibold text-lg mb-2">
                    Há desconto para pagamento anual?
                  </h4>
                  <p className="text-muted-foreground">
                    Sim! Oferecemos 20% de desconto para assinaturas anuais em
                    todos os planos pagos. Entre em contato para mais
                    informações.
                  </p>
                </div>
              </div>
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
                  <Link href="/login?tab=register">
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
                  <div style={{ width: 24, height: 24 }}>
                    <IconLogo />
                  </div>
                  <span className="text-xl font-bold">TôLivre</span>
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
                      href="/demonstracao"
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
              <p>&copy; 2025 TôLivre. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
