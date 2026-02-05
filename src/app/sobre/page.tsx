import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Users, Zap, Shield, TrendingUp } from "lucide-react";

export default function SobrePage() {
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
            Sobre o <span className="text-primary">TôLivre</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nascemos para simplificar a gestão de agendamentos e dar mais
            liberdade aos profissionais de beleza e bem-estar.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                <p className="text-muted-foreground">
                  Simplificar a gestão de agendamentos e proporcionar mais tempo
                  para os profissionais focarem no que realmente importa: seus
                  clientes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
                <p className="text-muted-foreground">
                  Transparência, simplicidade e excelência no atendimento. Cada
                  funcionalidade é pensada para facilitar a vida dos nossos
                  usuários.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
                <p className="text-muted-foreground">
                  Ser a plataforma de agendamentos mais completa e fácil de usar
                  do Brasil, ajudando milhares de profissionais a crescerem.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Por que escolher o <span className="text-primary">TôLivre</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Rápido e Simples",
                description:
                  "Interface intuitiva que você aprende em minutos. Comece a usar imediatamente.",
              },
              {
                icon: Shield,
                title: "Seguro e Confiável",
                description:
                  "Seus dados protegidos com criptografia de ponta. Conformidade total com a LGPD.",
              },
              {
                icon: TrendingUp,
                title: "Foco no Crescimento",
                description:
                  "Ferramentas que ajudam você a crescer seu negócio e fidelizar clientes.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Profissionais ativos" },
              { value: "10k+", label: "Agendamentos/mês" },
              { value: "4.9/5", label: "Avaliação média" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Faça parte da nossa história
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a centenas de profissionais que já transformaram sua gestão
            com o TôLivre.
          </p>
          <Link href="/login">
            <Button size="lg" className="rounded-full px-8">
              Começar grátis agora
            </Button>
          </Link>
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
