import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Users,
  BarChart3,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function DemonstracaoPage() {
  const demoFeatures = [
    {
      icon: Calendar,
      title: "Agenda Inteligente",
      description:
        "Veja como é fácil gerenciar todos os seus agendamentos em um só lugar.",
    },
    {
      icon: Users,
      title: "Gestão de Clientes",
      description:
        "Mantenha histórico completo de atendimentos e preferências.",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Automático",
      description: "Envio automático de lembretes e confirmações via WhatsApp.",
    },
    {
      icon: BarChart3,
      title: "Relatórios Detalhados",
      description:
        "Acompanhe faturamento, serviços mais vendidos e muito mais.",
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
            Veja o TôLivre em <span className="text-primary">ação</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore como nosso sistema pode transformar a gestão do seu negócio
            de beleza e bem-estar.
          </p>
          <Link href="/login">
            <Button size="lg" className="rounded-full px-8">
              Criar conta grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoFeatures.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video/Screenshot Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Interface moderna e intuitiva
            </h2>
            <p className="text-muted-foreground">
              Sistema pensado para ser simples e eficiente
            </p>
          </div>
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center border border-border">
            <p className="text-muted-foreground">Demonstração do sistema</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que experimentar o TôLivre?
          </h2>
          <div className="space-y-4">
            {[
              "Teste grátis por 7 dias - sem cartão de crédito",
              "Configure em minutos - interface super simples",
              "Suporte em português - sempre que precisar",
              "Cancele quando quiser - sem taxas ou multas",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para experimentar?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Crie sua conta grátis e comece a usar em minutos.
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
