"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  Bell,
  BarChart3,
  Settings,
  Smartphone,
  Zap,
  Shield,
  Globe,
  Mail,
  FileText,
  CreditCard,
  Repeat,
  Lock,
  Database,
  Workflow,
  Video,
  Upload,
  QrCode,
  Headphones,
  Star,
  ArrowRight,
  Sparkles,
  Target,
  Layers,
  Activity,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FeatureStatus = "disponivel" | "desenvolvimento" | "futuro";

interface Feature {
  category: string;
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  status: FeatureStatus;
  benefits: string[];
  details: string;
}

export default function RecursosPage() {
  const [activeCategory, setActiveCategory] = useState("todos");
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

  const categories = [
    { id: "todos", label: "Todos os Recursos", icon: Layers },
    { id: "agendamento", label: "Agendamento", icon: Calendar },
    { id: "comunicacao", label: "Comunicação", icon: MessageCircle },
    { id: "gestao", label: "Gestão", icon: Users },
    { id: "relatorios", label: "Relatórios", icon: BarChart3 },
    { id: "integracao", label: "Integrações", icon: Zap },
    { id: "seguranca", label: "Segurança", icon: Shield },
  ];

  const features: Feature[] = [
    {
      category: "agendamento",
      icon: Calendar,
      title: "Agenda Inteligente",
      description:
        "Sistema de agendamento completo com visualização em calendário, drag-and-drop e detecção automática de conflitos.",
      gradient: "from-blue-500 to-cyan-600",
      status: "disponivel",
      benefits: [
        "Visualização em dia, semana e mês",
        "Arrastar e soltar para reagendar",
        "Bloqueio de horários automático",
        "Sincronização em tempo real",
      ],
      details:
        "Nossa agenda inteligente aprende com seus padrões de agendamento e sugere os melhores horários para seus clientes, otimizando sua produtividade.",
    },
    {
      category: "agendamento",
      icon: Clock,
      title: "Horários Flexíveis",
      description:
        "Configure seus horários de trabalho, pausas, dias de folga e exceções com total flexibilidade.",
      gradient: "from-orange-500 to-red-600",
      status: "disponivel",
      benefits: [
        "Horários personalizados por dia",
        "Bloqueio de períodos específicos",
        "Intervalos entre atendimentos",
        "Feriados automáticos",
      ],
      details:
        "Defina regras complexas de disponibilidade que se ajustam automaticamente às suas necessidades e preferências.",
    },
    {
      category: "agendamento",
      icon: Repeat,
      title: "Agendamentos Recorrentes",
      description:
        "Crie agendamentos que se repetem semanalmente, quinzenalmente ou mensalmente com um clique.",
      gradient: "from-purple-500 to-pink-600",
      status: "desenvolvimento",
      benefits: [
        "Repetição semanal, quinzenal ou mensal",
        "Edição em lote de recorrências",
        "Exceções personalizadas",
        "Renovação automática",
      ],
      details:
        "Ideal para clientes fixos que retornam regularmente. Configure uma vez e deixe o sistema cuidar do resto.",
    },
    {
      category: "agendamento",
      icon: QrCode,
      title: "Agendamento por QR Code",
      description:
        "Gere QR Codes personalizados para seus serviços e facilite o agendamento dos seus clientes.",
      gradient: "from-green-500 to-emerald-600",
      status: "disponivel",
      benefits: [
        "QR Code único para cada serviço",
        "Agendamento instantâneo via celular",
        "Rastreamento de origem",
        "Impressão em materiais promocionais",
      ],
      details:
        "Coloque QR Codes em cartões de visita, folhetos ou na sua loja física e permita que clientes agendem instantaneamente.",
    },
    {
      category: "comunicacao",
      icon: MessageCircle,
      title: "Integração WhatsApp",
      description:
        "Envie confirmações, lembretes e avisos automáticos direto no WhatsApp dos seus clientes.",
      gradient: "from-green-500 to-green-600",
      status: "disponivel",
      benefits: [
        "Confirmação automática de agendamentos",
        "Lembretes 24h e 1h antes",
        "Mensagens personalizáveis",
        "Taxa de abertura de 98%",
      ],
      details:
        "A integração oficial com WhatsApp Business garante que suas mensagens cheguem instantaneamente e com alta taxa de leitura.",
    },
    {
      category: "comunicacao",
      icon: Bell,
      title: "Notificações em Tempo Real",
      description:
        "Receba alertas instantâneos sobre novos agendamentos, cancelamentos e alterações.",
      gradient: "from-yellow-500 to-orange-600",
      status: "disponivel",
      benefits: [
        "Push notifications no celular",
        "Alertas por email",
        "Sons personalizados",
        "Centro de notificações",
      ],
      details:
        "Mantenha-se sempre informado sobre o que acontece na sua agenda, onde quer que você esteja.",
    },
    {
      category: "comunicacao",
      icon: Mail,
      title: "Email Marketing",
      description:
        "Envie campanhas de email para seus clientes com ofertas, novidades e promoções.",
      gradient: "from-blue-500 to-purple-600",
      status: "futuro",
      benefits: [
        "Templates profissionais prontos",
        "Segmentação de clientes",
        "Agendamento de envios",
        "Relatórios de abertura e cliques",
      ],
      details:
        "Mantenha contato regular com sua base de clientes e aumente sua retenção e faturamento.",
    },
    {
      category: "comunicacao",
      icon: Video,
      title: "Consultas por Vídeo",
      description:
        "Realize atendimentos remotos com videochamadas integradas diretamente na plataforma.",
      gradient: "from-indigo-500 to-blue-600",
      status: "futuro",
      benefits: [
        "Videochamada HD integrada",
        "Gravação de sessões (opcional)",
        "Compartilhamento de tela",
        "Link automático para clientes",
      ],
      details:
        "Expanda seu alcance atendendo clientes em qualquer lugar do mundo com qualidade profissional.",
    },
    {
      category: "gestao",
      icon: Users,
      title: "Gestão de Clientes",
      description:
        "Mantenha um cadastro completo com histórico, preferências e informações de todos os seus clientes.",
      gradient: "from-purple-500 to-pink-600",
      status: "disponivel",
      benefits: [
        "Ficha completa do cliente",
        "Histórico de agendamentos",
        "Anotações e observações",
        "Tags personalizadas",
      ],
      details:
        "Conheça profundamente cada cliente e ofereça um atendimento personalizado que impressiona.",
    },
    {
      category: "gestao",
      icon: FileText,
      title: "Gestão de Serviços",
      description:
        "Cadastre seus serviços com descrição, duração, preço e personalize cada detalhe.",
      gradient: "from-cyan-500 to-blue-600",
      status: "disponivel",
      benefits: [
        "Catálogo completo de serviços",
        "Preços e durações flexíveis",
        "Combos e pacotes",
        "Cores personalizadas na agenda",
      ],
      details:
        "Organize seu portfólio de serviços de forma profissional e facilite a escolha dos seus clientes.",
    },
    {
      category: "gestao",
      icon: CreditCard,
      title: "Controle Financeiro",
      description:
        "Acompanhe pagamentos, pendências e seu faturamento com relatórios financeiros detalhados.",
      gradient: "from-green-500 to-teal-600",
      status: "desenvolvimento",
      benefits: [
        "Registro de pagamentos",
        "Controle de contas a receber",
        "Múltiplas formas de pagamento",
        "Relatórios de faturamento",
      ],
      details:
        "Tenha uma visão clara da saúde financeira do seu negócio e nunca perca o controle das suas contas.",
    },
    {
      category: "gestao",
      icon: Settings,
      title: "Multi-usuários e Permissões",
      description:
        "Gerencie múltiplos profissionais com diferentes níveis de acesso e permissões personalizadas.",
      gradient: "from-indigo-500 to-purple-600",
      status: "disponivel",
      benefits: [
        "Perfis de acesso personalizados",
        "Gestão de equipe completa",
        "Agendas individuais e coletivas",
        "Logs de auditoria",
      ],
      details:
        "Ideal para clínicas, salões e empresas com múltiplos profissionais que precisam trabalhar de forma integrada.",
    },
    {
      category: "relatorios",
      icon: BarChart3,
      title: "Dashboard Analítico",
      description:
        "Visualize métricas importantes em tempo real com gráficos interativos e indicadores de performance.",
      gradient: "from-blue-500 to-cyan-600",
      status: "desenvolvimento",
      benefits: [
        "KPIs em tempo real",
        "Gráficos interativos",
        "Comparativos mensais",
        "Exportação de dados",
      ],
      details:
        "Tome decisões baseadas em dados concretos e identifique oportunidades de crescimento no seu negócio.",
    },
    {
      category: "relatorios",
      icon: TrendingUp,
      title: "Relatórios Avançados",
      description:
        "Gere relatórios detalhados sobre faturamento, ocupação, clientes e performance da equipe.",
      gradient: "from-purple-500 to-pink-600",
      status: "desenvolvimento",
      benefits: [
        "Relatórios personalizáveis",
        "Filtros avançados",
        "Agendamento de envios",
        "Export PDF, Excel e CSV",
      ],
      details:
        "Análises profundas que revelam insights valiosos sobre seu negócio e ajudam no planejamento estratégico.",
    },
    {
      category: "relatorios",
      icon: Activity,
      title: "Análise de Performance",
      description:
        "Acompanhe a produtividade individual e da equipe com métricas detalhadas de desempenho.",
      gradient: "from-orange-500 to-red-600",
      status: "desenvolvimento",
      benefits: [
        "Taxa de ocupação",
        "Serviços mais vendidos",
        "Horários de pico",
        "Comparativo entre profissionais",
      ],
      details:
        "Identifique seus melhores profissionais, serviços mais rentáveis e otimize sua operação.",
    },
    {
      category: "relatorios",
      icon: Target,
      title: "Metas e Objetivos",
      description:
        "Defina metas de faturamento, atendimentos e acompanhe o progresso em tempo real.",
      gradient: "from-yellow-500 to-orange-600",
      status: "futuro",
      benefits: [
        "Metas personalizadas",
        "Acompanhamento visual",
        "Alertas de performance",
        "Gamificação da equipe",
      ],
      details:
        "Motive sua equipe com metas claras e acompanhe o progresso de forma visual e envolvente.",
    },
    {
      category: "integracao",
      icon: Zap,
      title: "API Completa",
      description:
        "Integre o ToLivre com outros sistemas usando nossa API REST completa e bem documentada.",
      gradient: "from-yellow-500 to-orange-600",
      status: "futuro",
      benefits: [
        "Endpoints RESTful",
        "Documentação completa",
        "Webhooks em tempo real",
        "Rate limiting generoso",
      ],
      details:
        "Para empresas que precisam de integrações customizadas com seus sistemas internos ou externos.",
    },
    {
      category: "integracao",
      icon: Globe,
      title: "Calendários Externos",
      description:
        "Sincronize com Google Calendar, Outlook e outros calendários para evitar conflitos.",
      gradient: "from-blue-500 to-indigo-600",
      status: "futuro",
      benefits: [
        "Sync bidirecional",
        "Google Calendar",
        "Microsoft Outlook",
        "Apple Calendar",
      ],
      details:
        "Mantenha todos os seus compromissos em um só lugar e nunca mais tenha conflitos de horário.",
    },
    {
      category: "integracao",
      icon: CreditCard,
      title: "Pagamentos Online",
      description:
        "Aceite pagamentos online com integração de gateways como Stripe, PagSeguro e Mercado Pago.",
      gradient: "from-green-500 to-emerald-600",
      status: "futuro",
      benefits: [
        "Múltiplos gateways",
        "Pagamento no agendamento",
        "Recorrência automática",
        "Split de pagamentos",
      ],
      details:
        "Receba pagamentos antecipados e reduza drasticamente o índice de no-show dos seus clientes.",
    },
    {
      category: "integracao",
      icon: Workflow,
      title: "Automações Zapier",
      description:
        "Conecte o ToLivre com mais de 5000 aplicativos através do Zapier sem escrever código.",
      gradient: "from-orange-500 to-red-600",
      status: "futuro",
      benefits: [
        "5000+ integrações disponíveis",
        "Automações sem código",
        "Triggers customizados",
        "Workflows complexos",
      ],
      details:
        "Automatize fluxos de trabalho complexos e economize horas de trabalho manual todos os meses.",
    },
    {
      category: "seguranca",
      icon: Shield,
      title: "Segurança de Ponta",
      description:
        "Seus dados protegidos com criptografia SSL/TLS, backups automáticos e conformidade LGPD.",
      gradient: "from-red-500 to-pink-600",
      status: "disponivel",
      benefits: [
        "Criptografia SSL/TLS 256-bit",
        "Backups diários automáticos",
        "Conformidade LGPD",
        "Autenticação de dois fatores",
      ],
      details:
        "Segurança de nível bancário para garantir que seus dados e dos seus clientes estejam sempre protegidos.",
    },
    {
      category: "seguranca",
      icon: Lock,
      title: "Autenticação Avançada",
      description:
        "Proteja sua conta com autenticação de dois fatores e controle de acesso granular.",
      gradient: "from-purple-500 to-indigo-600",
      status: "desenvolvimento",
      benefits: [
        "Two-factor authentication (2FA)",
        "Biometria no app mobile",
        "Sessões seguras",
        "Logout automático",
      ],
      details:
        "Camadas extras de segurança para garantir que apenas pessoas autorizadas acessem suas informações.",
    },
    {
      category: "seguranca",
      icon: Database,
      title: "Backup e Recuperação",
      description:
        "Backups automáticos diários com recuperação rápida em caso de necessidade.",
      gradient: "from-blue-500 to-cyan-600",
      status: "disponivel",
      benefits: [
        "Backup automático diário",
        "Retenção de 30 dias",
        "Recuperação point-in-time",
        "Redundância geográfica",
      ],
      details:
        "Durma tranquilo sabendo que seus dados estão seguros e podem ser recuperados a qualquer momento.",
    },
    {
      category: "seguranca",
      icon: FileText,
      title: "Logs de Auditoria",
      description:
        "Rastreie todas as ações realizadas na plataforma com logs detalhados de auditoria.",
      gradient: "from-gray-500 to-slate-600",
      status: "futuro",
      benefits: [
        "Registro de todas as ações",
        "Histórico de alterações",
        "Identificação de usuários",
        "Relatórios de compliance",
      ],
      details:
        "Mantenha controle total sobre quem fez o quê e quando, essencial para empresas que precisam de compliance.",
    },
  ];

  const filteredFeatures =
    activeCategory === "todos"
      ? features
      : features.filter((f) => f.category === activeCategory);

  const additionalBenefits = [
    {
      icon: Smartphone,
      title: "Apps Mobile Nativos",
      description: "Apps para iOS e Android com experiência nativa completa",
      color: "text-blue-500",
    },
    {
      icon: Globe,
      title: "Acesso em Qualquer Lugar",
      description: "Plataforma 100% web, acesse de qualquer dispositivo",
      color: "text-purple-500",
    },
    {
      icon: Headphones,
      title: "Suporte em Português",
      description: "Atendimento rápido e eficiente em português brasileiro",
      color: "text-green-500",
    },
    {
      icon: Upload,
      title: "Migração Gratuita",
      description:
        "Nossa equipe migra seus dados de outras plataformas gratuitamente",
      color: "text-orange-500",
    },
    {
      icon: Star,
      title: "Treinamento Incluído",
      description: "Vídeos tutoriais e sessões de onboarding personalizadas",
      color: "text-yellow-500",
    },
    {
      icon: Zap,
      title: "Atualizações Constantes",
      description: "Novos recursos e melhorias lançados regularmente",
      color: "text-pink-500",
    },
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
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Recursos Completos
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
                Tudo que você precisa
              </span>
              <span className="block">em uma plataforma</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Descubra todos os recursos poderosos que vão transformar a gestão
              do seu negócio e encantar seus clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="relative py-8 px-4 sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                    : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span className="font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-card border border-border rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {feature.status === "disponivel" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      Disponível
                    </span>
                  )}
                  {feature.status === "desenvolvimento" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                      <Clock className="w-3 h-3" />
                      Em Desenvolvimento
                    </span>
                  )}
                  {feature.status === "futuro" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Em Breve
                    </span>
                  )}
                </div>

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>

                <div className="space-y-3 mb-6">
                  {feature.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground italic">
                    {feature.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="relative py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              E tem muito mais...
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Benefícios adicionais que fazem toda a diferença
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <benefit.icon className={`w-12 h-12 mb-4 ${benefit.color}`} />
                <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Compare com outras plataformas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Veja por que o ToLivre é a escolha certa
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full">
              <thead className="bg-primary/10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Recurso</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    ToLivre
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                    Concorrente A
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                    Concorrente B
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "WhatsApp Integrado",
                    tolivre: true,
                    compA: false,
                    compB: true,
                  },
                  {
                    name: "Agendamentos Ilimitados",
                    tolivre: true,
                    compA: false,
                    compB: false,
                  },
                  {
                    name: "Apps Mobile Nativos",
                    tolivre: true,
                    compA: true,
                    compB: false,
                  },
                  {
                    name: "API Completa",
                    tolivre: true,
                    compA: false,
                    compB: true,
                  },
                  {
                    name: "Suporte em Português",
                    tolivre: true,
                    compA: true,
                    compB: false,
                  },
                  {
                    name: "Preço Competitivo",
                    tolivre: true,
                    compA: false,
                    compB: false,
                  },
                  {
                    name: "Sem Taxa de Setup",
                    tolivre: true,
                    compA: false,
                    compB: true,
                  },
                  {
                    name: "Migração Gratuita",
                    tolivre: true,
                    compA: false,
                    compB: false,
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{row.name}</td>
                    <td className="px-6 py-4 text-center">
                      {row.tolivre ? (
                        <CheckCircle className="w-6 h-6 mx-auto text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.compA ? (
                        <CheckCircle className="w-6 h-6 mx-auto text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.compB ? (
                        <CheckCircle className="w-6 h-6 mx-auto text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary via-blue-500 to-purple-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center text-white">
            {[
              { number: "40+", label: "Recursos Completos" },
              { number: "99.9%", label: "Uptime Garantido" },
              { number: "24/7", label: "Suporte Disponível" },
              { number: "5000+", label: "Integrações Possíveis" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-6xl font-bold mb-4">{stat.number}</div>
                <p className="text-xl text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Teste todos esses recursos gratuitamente por 14 dias. Sem cartão de
            crédito, sem compromisso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-blue-600"
              >
                Começar Grátis Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contato">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Falar com Especialista
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            14 dias grátis • Cancele quando quiser • Suporte em português
          </p>
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
                    href="/#pricing"
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
