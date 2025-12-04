"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Sparkles,
  BarChart3,
  Bell,
  Settings,
  Smartphone,
  Monitor,
  Tablet,
  Layout,
  Zap,
  Star,
  TrendingUp,
  Shield,
  FileText,
  Mail,
  Phone,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function DemonstracaoPage() {
  const [activeDemo, setActiveDemo] = useState("dashboard");
  const [activeDevice, setActiveDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
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

  const demoSections = [
    {
      id: "dashboard",
      title: "Dashboard Intuitivo",
      icon: Layout,
      description: "Visualize toda a sua operação em um único lugar",
      features: [
        "Agenda visual com cores personalizadas",
        "KPIs em tempo real",
        "Próximos agendamentos",
        "Estatísticas de performance",
      ],
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      id: "calendar",
      title: "Calendário Inteligente",
      icon: Calendar,
      description: "Gerencie seus horários com facilidade",
      features: [
        "Visualização dia, semana e mês",
        "Drag-and-drop para reagendar",
        "Bloqueio automático de conflitos",
        "Sincronização em tempo real",
      ],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: "whatsapp",
      title: "WhatsApp Integrado",
      icon: MessageCircle,
      description: "Comunicação automática com seus clientes",
      features: [
        "Confirmações automáticas",
        "Lembretes personalizados",
        "Taxa de abertura de 98%",
        "Templates customizáveis",
      ],
      gradient: "from-green-500 to-emerald-600",
    },
    {
      id: "clients",
      title: "Gestão de Clientes",
      icon: Users,
      description: "Conheça profundamente cada cliente",
      features: [
        "Ficha completa do cliente",
        "Histórico de agendamentos",
        "Notas e observações",
        "Tags personalizadas",
      ],
      gradient: "from-orange-500 to-red-600",
    },
    {
      id: "reports",
      title: "Relatórios Avançados",
      icon: BarChart3,
      description: "Tome decisões baseadas em dados",
      features: [
        "Dashboard analítico",
        "Gráficos interativos",
        "Exportação de dados",
        "Comparativos mensais",
      ],
      gradient: "from-yellow-500 to-orange-600",
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Agendamento Rápido",
      description:
        "Crie novos agendamentos em segundos com formulário inteligente",
    },
    {
      icon: Bell,
      title: "Notificações Push",
      description: "Receba alertas em tempo real sobre novos agendamentos",
    },
    {
      icon: Clock,
      title: "Horários Flexíveis",
      description:
        "Configure seus horários de trabalho com total flexibilidade",
    },
    {
      icon: Settings,
      title: "Personalização Total",
      description: "Adapte a plataforma às necessidades do seu negócio",
    },
    {
      icon: MessageCircle,
      title: "Chat Integrado",
      description: "Converse com seus clientes direto pela plataforma",
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Criptografia SSL e backups automáticos diários",
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Salão Bella Donna",
      avatar: "MS",
      text: "A interface é tão intuitiva que toda minha equipe aprendeu a usar em minutos!",
      rating: 5,
    },
    {
      name: "Carlos Mendes",
      role: "Clínica Med+",
      avatar: "CM",
      text: "Testamos várias plataformas antes de encontrar o ToLivre. A diferença é impressionante.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Personal Trainer",
      avatar: "AC",
      text: "Uso no celular e no computador. Funciona perfeitamente em todos os dispositivos!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10seg", label: "Para criar um agendamento", icon: Zap },
    { number: "98%", label: "Taxa de satisfação", icon: Star },
    { number: "40%", label: "Redução de cancelamentos", icon: TrendingUp },
    { number: "24/7", label: "Disponível sempre", icon: Clock },
  ];

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
              <Play className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Demonstração Interativa
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
                Veja o ToLivre
              </span>
              <span className="block">em ação</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Explore nossa plataforma e descubra como é fácil gerenciar seus
              agendamentos com uma interface moderna e intuitiva.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-blue-600"
                >
                  Criar Conta Grátis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                >
                  Agendar Demonstração
                  <Calendar className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Device Selector */}
      <section className="relative py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveDevice("desktop")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                activeDevice === "desktop"
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="font-medium">Desktop</span>
            </button>
            <button
              onClick={() => setActiveDevice("tablet")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                activeDevice === "tablet"
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <Tablet className="w-4 h-4" />
              <span className="font-medium">Tablet</span>
            </button>
            <button
              onClick={() => setActiveDevice("mobile")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                activeDevice === "mobile"
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="font-medium">Mobile</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Demo Navigation */}
            <div className="lg:col-span-1 space-y-4">
              {demoSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveDemo(section.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                    activeDemo === section.id
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                      : "bg-card border-border hover:border-primary/50 hover:scale-102"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activeDemo === section.id
                          ? "bg-white/20"
                          : `bg-gradient-to-br ${section.gradient}`
                      }`}
                    >
                      <section.icon
                        className={`w-6 h-6 ${
                          activeDemo === section.id
                            ? "text-white"
                            : "text-white"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">
                        {section.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          activeDemo === section.id
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {section.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Demo Display */}
            <div className="lg:col-span-2">
              <div
                className={`relative rounded-3xl overflow-hidden shadow-2xl border-8 border-border/30 bg-gradient-to-br from-primary/10 to-purple-500/10 transition-all duration-500 ${
                  activeDevice === "desktop"
                    ? "aspect-video"
                    : activeDevice === "tablet"
                    ? "aspect-[4/3] max-w-2xl mx-auto"
                    : "aspect-[9/16] max-w-md mx-auto"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-12">
                  <div className="text-center w-full">
                    {demoSections
                      .filter((s) => s.id === activeDemo)
                      .map((section) => (
                        <div key={section.id} className="space-y-6">
                          <div
                            className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-6`}
                          >
                            <section.icon className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="text-3xl font-bold text-white mb-4">
                            {section.title}
                          </h3>
                          <p className="text-gray-300 text-lg mb-8">
                            {section.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {section.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left"
                              >
                                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <span className="text-white text-sm">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                {demoSections
                  .find((s) => s.id === activeDemo)
                  ?.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-border rounded-full px-4 py-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                      {feature}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary via-blue-500 to-purple-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Performance que impressiona
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Números que comprovam a eficiência da nossa plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                <div className="text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <p className="text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recursos que fazem a diferença
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra todas as funcionalidades que vão transformar seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
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
              Experiências reais de quem usa o ToLivre todos os dias
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

      {/* Video Demo Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Assista ao vídeo de demonstração
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Veja em detalhes como o ToLivre funciona
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-border/30 bg-gradient-to-br from-primary/10 to-purple-500/10">
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
              <button className="group relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-300"></div>
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-12 h-12 text-white ml-1" />
                </div>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Ou agende uma demonstração personalizada com nossa equipe
            </p>
            <Link href="/contato">
              <Button size="lg" variant="outline">
                Agendar Demonstração Ao Vivo
                <Calendar className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-primary via-blue-500 to-purple-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Crie sua conta grátis agora e descubra como é fácil gerenciar seus
            agendamentos com o ToLivre.
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
                <Phone className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>14 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Sem cartão</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Suporte em português</span>
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
            <p>&copy; 2025 ToLivre. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
