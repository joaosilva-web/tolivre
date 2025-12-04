import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Target,
  Heart,
  Users,
  Lightbulb,
  TrendingUp,
  Award,
  Clock,
  Shield,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Voltar para Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button>Começar Grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Sobre o ToLivre
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Nascemos com a missão de transformar a forma como profissionais e
            empresas gerenciam seus agendamentos, oferecendo tecnologia de ponta
            e experiência excepcional.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Nossa História
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Como tudo começou
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Em 2024, observamos que profissionais de todas as áreas
                  enfrentavam os mesmos desafios: planilhas desorganizadas,
                  mensagens perdidas no WhatsApp, clientes esquecendo horários e
                  tempo precioso desperdiçado com tarefas administrativas.
                </p>
                <p>
                  Foi então que decidimos criar o <strong>ToLivre</strong> - uma
                  plataforma completa que une tecnologia de ponta, automação
                  inteligente e experiência do usuário excepcional para resolver
                  de vez esses problemas.
                </p>
                <p>
                  Desde o lançamento em 2025, já ajudamos centenas de
                  profissionais a economizar tempo, reduzir cancelamentos e
                  oferecer uma experiência premium aos seus clientes. E isso é
                  apenas o começo.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary via-blue-500 to-purple-500 rounded-3xl p-12 text-white">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 rounded-lg p-3">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">2024</h3>
                      <p className="text-white/90">
                        Identificação do problema e início do desenvolvimento
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 rounded-lg p-3">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Q1 2025</h3>
                      <p className="text-white/90">
                        Lançamento oficial da plataforma ToLivre
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 rounded-lg p-3">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Q2 2025</h3>
                      <p className="text-white/90">
                        Integração WhatsApp e 500+ clientes ativos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 rounded-lg p-3">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Futuro</h3>
                      <p className="text-white/90">
                        Expansão internacional e novos recursos com IA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Missão, Visão e Valores
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              O que nos move e para onde estamos indo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simplificar a gestão de agendamentos para profissionais de todas
                as áreas, oferecendo tecnologia acessível, intuitiva e poderosa
                que economiza tempo e melhora a experiência dos clientes.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser a plataforma de agendamentos número 1 na América Latina,
                reconhecida pela excelência em tecnologia, inovação contínua e
                impacto positivo na vida de milhões de profissionais.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Foco absoluto no cliente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Inovação constante</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Simplicidade e usabilidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Transparência e ética</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores Detalhados */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              O que nos define
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam cada decisão e cada linha de código
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 rounded-lg p-3 shrink-0">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    Obsessão pelo Cliente
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cada funcionalidade é pensada para resolver problemas reais.
                    Ouvimos atentamente nossos usuários e evoluímos com base no
                    feedback deles.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/10 rounded-lg p-3 shrink-0">
                  <Zap className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    Velocidade e Agilidade
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Desenvolvemos e lançamos recursos rapidamente, sem
                    comprometer qualidade. Acreditamos em evolução contínua e
                    iterativa.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 rounded-lg p-3 shrink-0">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    Segurança e Privacidade
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Proteger os dados dos nossos usuários é prioridade máxima.
                    Investimos pesado em infraestrutura segura e conformidade
                    com LGPD.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/10 rounded-lg p-3 shrink-0">
                  <Award className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Excelência Técnica</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Utilizamos as melhores práticas de desenvolvimento e as
                    tecnologias mais modernas para garantir uma plataforma
                    rápida, estável e escalável.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Números que impressionam */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary via-blue-500 to-purple-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nosso impacto em números
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Resultados que provam nossa dedicação
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                15k+
              </div>
              <p className="text-white/90 text-lg">Agendamentos/Mês</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                500+
              </div>
              <p className="text-white/90 text-lg">Clientes Ativos</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                99.9%
              </div>
              <p className="text-white/90 text-lg">Uptime Garantido</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                98%
              </div>
              <p className="text-white/90 text-lg">Satisfação</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compromissos */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nossos compromissos com você
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Garantias que fazemos a cada usuário da plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-2xl p-8">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Seguro</h3>
              <p className="text-muted-foreground">
                Seus dados são criptografados e protegidos com os mais altos
                padrões de segurança. Conformidade total com LGPD e certificação
                SSL.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Suporte Rápido</h3>
              <p className="text-muted-foreground">
                Equipe dedicada disponível 24/7 para resolver qualquer dúvida ou
                problema. Tempo médio de resposta inferior a 2 horas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-8">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Evolução Constante</h3>
              <p className="text-muted-foreground">
                Novos recursos e melhorias lançados mensalmente baseados no
                feedback dos usuários. Sua opinião molda nosso produto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Faça parte dessa história
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de profissionais que já transformaram sua gestão
            de agendamentos com o ToLivre
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Começar Grátis por 14 dias
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Ver Demonstração
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Sem necessidade de cartão de crédito • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer simplificado */}
      <footer className="border-t bg-card py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 ToLivre. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link
              href="/legal/privacidade"
              className="hover:text-primary transition-colors text-sm"
            >
              Privacidade
            </Link>
            <Link
              href="/legal/termos"
              className="hover:text-primary transition-colors text-sm"
            >
              Termos
            </Link>
            <Link
              href="/legal/seguranca"
              className="hover:text-primary transition-colors text-sm"
            >
              Segurança
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
