import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  Bell,
  BarChart3,
  Smartphone,
  Shield,
  Globe,
  CreditCard,
  Zap,
} from "lucide-react";

export default function RecursosPage() {
  const features = [
    {
      icon: Calendar,
      title: "Agendamento Online 24/7",
      description:
        "Seus clientes podem agendar a qualquer hora, de qualquer lugar. Sistema inteligente que respeita seus horários disponíveis.",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Integrado",
      description:
        "Envie lembretes automáticos, confirmações e notificações direto pelo WhatsApp. Reduza faltas em até 70%.",
    },
    {
      icon: Users,
      title: "Gestão de Equipe",
      description:
        "Gerencie múltiplos profissionais, defina horários individuais e acompanhe o desempenho de cada um.",
    },
    {
      icon: Clock,
      title: "Horários Flexíveis",
      description:
        "Configure horários de funcionamento, intervalos, exceções e bloqueios. Total controle da sua agenda.",
    },
    {
      icon: TrendingUp,
      title: "Sistema de Comissões",
      description:
        "Calcule automaticamente as comissões dos profissionais. Relatórios detalhados de ganhos por período.",
    },
    {
      icon: Bell,
      title: "Lembretes Automáticos",
      description:
        "Notificações por WhatsApp e email para confirmar agendamentos e reduzir cancelamentos de última hora.",
    },
    {
      icon: BarChart3,
      title: "Relatórios Avançados",
      description:
        "Acompanhe faturamento, serviços mais vendidos, horários de pico e muito mais com gráficos interativos.",
    },
    {
      icon: Smartphone,
      title: "Página Personalizada",
      description:
        "Página de agendamento com suas cores e logo. Compartilhe o link e receba agendamentos 24/7.",
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description:
        "Dados criptografados, backups automáticos e conformidade com a LGPD. Seus dados sempre protegidos.",
    },
    {
      icon: Globe,
      title: "Acesso de Qualquer Lugar",
      description:
        "Sistema 100% online. Acesse do computador, tablet ou celular. Sincronização em tempo real.",
    },
    {
      icon: CreditCard,
      title: "Controle Financeiro",
      description:
        "Gerencie pagamentos, caixa, receitas e despesas. Tenha controle total das finanças do seu negócio.",
    },
    {
      icon: Zap,
      title: "Rápido e Intuitivo",
      description:
        "Interface moderna e fácil de usar. Aprenda em minutos e comece a usar imediatamente.",
    },
  ];

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
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Recursos <span className="text-primary">completos</span> para seu
            negócio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Todas as ferramentas que você precisa para gerenciar agendamentos,
            clientes e fazer seu negócio crescer.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experimente todos os recursos grátis
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Teste por 7 dias sem precisar de cartão de crédito.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full px-8"
            asChild
          >
            <Link href="/login">Começar teste grátis</Link>
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
