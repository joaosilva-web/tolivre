import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Scale,
  Users,
  AlertTriangle,
  Shield,
  CreditCard,
} from "lucide-react";

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Voltar para o site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 mb-6">
            <Scale className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Termos de Uso e Serviço
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Última atualização: 1 de dezembro de 2025
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estes termos regulam o uso da plataforma ToLivre e estabelecem os
            direitos e responsabilidades entre você e nossa empresa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Quick Navigation */}
          <div className="bg-card border rounded-xl p-6 mb-12">
            <h3 className="font-semibold text-lg mb-4">Navegação Rápida</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <a href="#aceitacao" className="text-primary hover:underline">
                1. Aceitação dos Termos
              </a>
              <a href="#definicoes" className="text-primary hover:underline">
                2. Definições
              </a>
              <a href="#servicos" className="text-primary hover:underline">
                3. Descrição dos Serviços
              </a>
              <a href="#cadastro" className="text-primary hover:underline">
                4. Cadastro e Conta
              </a>
              <a href="#planos" className="text-primary hover:underline">
                5. Planos e Pagamentos
              </a>
              <a href="#uso-aceitavel" className="text-primary hover:underline">
                6. Uso Aceitável
              </a>
              <a href="#propriedade" className="text-primary hover:underline">
                7. Propriedade Intelectual
              </a>
              <a href="#dados" className="text-primary hover:underline">
                8. Proteção de Dados
              </a>
              <a
                href="#disponibilidade"
                className="text-primary hover:underline"
              >
                9. Disponibilidade
              </a>
              <a href="#limitacao" className="text-primary hover:underline">
                10. Limitação de Responsabilidade
              </a>
              <a href="#rescisao" className="text-primary hover:underline">
                11. Rescisão
              </a>
              <a href="#lei" className="text-primary hover:underline">
                12. Lei Aplicável
              </a>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="text-blue-900 dark:text-blue-100 mt-0 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Leia com Atenção
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-0">
                Ao acessar ou usar o ToLivre, você concorda em ficar vinculado a
                estes Termos de Uso. Se você não concordar com alguma parte
                destes termos, não utilize nossos serviços.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div id="aceitacao" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold">1. Aceitação dos Termos</h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                Ao criar uma conta, acessar ou utilizar qualquer funcionalidade
                do ToLivre, você declara que:
              </p>

              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Leu, compreendeu e concorda com estes Termos de Uso em sua
                    totalidade
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Tem capacidade legal para celebrar contratos vinculantes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Se representa uma empresa ou organização, tem autoridade
                    para vinculá-la a estes termos
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Concorda com nossa Política de Privacidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Utilizará o serviço em conformidade com todas as leis
                    aplicáveis
                  </span>
                </li>
              </ul>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                <p className="text-yellow-900 dark:text-yellow-100 mb-0 text-sm">
                  <strong>Importante:</strong> Se você não concorda com qualquer
                  parte destes termos, não crie uma conta ou utilize nossos
                  serviços.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div id="definicoes" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold">2. Definições</h2>
            </div>

            <div className="space-y-4 ml-13">
              <div className="bg-card border rounded-lg p-5">
                <h4 className="font-semibold mb-2">
                  ToLivre / Plataforma / Serviço
                </h4>
                <p className="text-sm text-muted-foreground">
                  Refere-se ao sistema de gestão de agendamentos oferecido pela
                  empresa ToLivre Tecnologia Ltda., incluindo website,
                  aplicativos móveis e todas as funcionalidades associadas.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-5">
                <h4 className="font-semibold mb-2">Usuário / Você / Cliente</h4>
                <p className="text-sm text-muted-foreground">
                  Pessoa física ou jurídica que cria uma conta e utiliza os
                  serviços do ToLivre, seja no plano gratuito ou em qualquer
                  plano pago.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-5">
                <h4 className="font-semibold mb-2">Conta</h4>
                <p className="text-sm text-muted-foreground">
                  Perfil criado pelo usuário na plataforma, contendo informações
                  de identificação, configurações e dados necessários para
                  utilização do serviço.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-5">
                <h4 className="font-semibold mb-2">Conteúdo do Usuário</h4>
                <p className="text-sm text-muted-foreground">
                  Toda e qualquer informação, dado, texto, imagem ou material
                  enviado, armazenado ou processado pelo usuário através da
                  plataforma.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-5">
                <h4 className="font-semibold mb-2">Plano</h4>
                <p className="text-sm text-muted-foreground">
                  Modalidade de serviço contratada pelo usuário (Starter,
                  Professional ou Enterprise), cada uma com funcionalidades e
                  limites específicos.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div id="servicos" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">3. Descrição dos Serviços</h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                O ToLivre oferece uma plataforma SaaS (Software as a Service)
                para gestão de agendamentos, incluindo:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-3">
                    Funcionalidades Principais
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Sistema de agendamento online</li>
                    <li>• Gestão de clientes e histórico</li>
                    <li>• Calendário inteligente</li>
                    <li>• Notificações automáticas</li>
                    <li>• Relatórios e estatísticas</li>
                    <li>• Gestão de serviços e horários</li>
                  </ul>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-3">Integrações</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• WhatsApp Business (via Uazapi)</li>
                    <li>• Google Calendar (em desenvolvimento)</li>
                    <li>• Gateways de pagamento</li>
                    <li>• APIs de terceiros</li>
                    <li>• Webhooks personalizados</li>
                    <li>• Exportação de dados</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
                <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                  Evolução do Serviço
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
                  Reservamos o direito de adicionar, modificar ou remover
                  funcionalidades a qualquer momento. Mudanças significativas
                  serão comunicadas com antecedência aos usuários.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="cadastro" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold">4. Cadastro e Conta</h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  4.1. Criação de Conta
                </h3>
                <p className="text-muted-foreground mb-4">
                  Para utilizar o ToLivre, você deve:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Fornecer informações verdadeiras, precisas, atuais e
                      completas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Manter e atualizar prontamente suas informações cadastrais
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Criar uma senha segura e mantê-la confidencial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Ser maior de 18 anos ou ter autorização dos responsáveis
                      legais
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  4.2. Segurança da Conta
                </h3>
                <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <p className="text-red-900 dark:text-red-100 mb-3">
                    <strong>Você é responsável por:</strong>
                  </p>
                  <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                    <li>
                      • Todas as atividades realizadas através da sua conta
                    </li>
                    <li>
                      • Manter a confidencialidade de suas credenciais de acesso
                    </li>
                    <li>
                      • Notificar-nos imediatamente sobre qualquer uso não
                      autorizado
                    </li>
                    <li>• Não compartilhar sua conta com terceiros</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  4.3. Contas Corporativas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Para contas empresariais, você garante ter autoridade para
                  representar a empresa e vinculá-la a estes termos. Todas as
                  obrigações aplicam-se à entidade representada.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div id="planos" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold">5. Planos e Pagamentos</h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  5.1. Planos Disponíveis
                </h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Starter (Gratuito)</h4>
                      <span className="text-sm bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                        R$ 0/mês
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Até 50 agendamentos/mês, 1 profissional, funcionalidades
                      básicas.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Professional</h4>
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                        R$ 49/mês
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Agendamentos ilimitados, até 3 profissionais, WhatsApp
                      integrado, relatórios avançados.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Enterprise</h4>
                      <span className="text-sm bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
                        R$ 149/mês
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Profissionais ilimitados, API completa, white label,
                      suporte 24/7, treinamento dedicado.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  5.2. Cobrança e Renovação
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Planos pagos são cobrados mensalmente no mesmo dia da
                      contratação
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      A renovação é automática, salvo cancelamento prévio
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Aceitamos cartão de crédito e boleto bancário</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Preços não incluem impostos aplicáveis (adicionados na
                      cobrança)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Faturas são enviadas por e-mail antes da data de renovação
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  5.3. Mudança de Plano
                </h3>
                <p className="text-muted-foreground mb-3">
                  Você pode fazer upgrade ou downgrade a qualquer momento:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Upgrade:</strong> Mudanças são aplicadas
                      imediatamente, com cobrança proporcional
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Downgrade:</strong> Aplicado no próximo ciclo de
                      cobrança, sem reembolso do período atual
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  5.4. Política de Reembolso
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-5">
                  <ul className="space-y-2 text-sm text-yellow-900 dark:text-yellow-100">
                    <li>
                      • Garantia de 30 dias para novos clientes (primeiro
                      pagamento)
                    </li>
                    <li>
                      • Reembolso integral se solicitado dentro do prazo de
                      garantia
                    </li>
                    <li>• Após 30 dias, não há reembolso de valores pagos</li>
                    <li>
                      • Cancelamento pode ser feito a qualquer momento sem
                      penalidades
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  5.5. Atraso de Pagamento
                </h3>
                <p className="text-sm text-muted-foreground">
                  Em caso de falha no pagamento, sua conta será suspensa após 7
                  dias. Você terá 30 dias para regularizar antes da exclusão
                  permanente dos dados. Cobranças pendentes continuam devidas.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div id="uso-aceitavel" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-3xl font-bold">6. Uso Aceitável</h2>
            </div>

            <div className="space-y-6 ml-13">
              <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h4 className="font-semibold mb-3 text-red-900 dark:text-red-100">
                  É Expressamente Proibido:
                </h4>
                <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>
                      Usar o serviço para fins ilegais ou não autorizados
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>
                      Violar direitos de propriedade intelectual de terceiros
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>Enviar spam, malware ou conteúdo malicioso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>
                      Tentar acessar áreas restritas ou contas de outros
                      usuários
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>
                      Fazer engenharia reversa, descompilar ou desmontar o
                      software
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>
                      Sobrecarregar ou interferir com a infraestrutura do
                      serviço
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>
                      Coletar dados de outros usuários sem consentimento
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>
                      Usar o serviço para competir conosco ou revender
                      funcionalidades
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>
                      Publicar conteúdo difamatório, obsceno, discriminatório ou
                      ofensivo
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">❌</span>
                    <span>
                      Criar múltiplas contas gratuitas para contornar limitações
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Consequências da Violação
                </h3>
                <p className="text-sm text-muted-foreground">
                  A violação desta política pode resultar em suspensão ou
                  encerramento imediato da conta, sem aviso prévio ou reembolso,
                  e possíveis ações legais.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div id="propriedade" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold">7. Propriedade Intelectual</h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  7.1. Propriedade do ToLivre
                </h3>
                <p className="text-muted-foreground mb-4">
                  Todos os direitos de propriedade intelectual relacionados ao
                  ToLivre pertencem a nós, incluindo:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li>• Código-fonte, algoritmos e arquitetura do sistema</li>
                  <li>• Design, interface, layout e experiência do usuário</li>
                  <li>• Marcas registradas, logotipos e identidade visual</li>
                  <li>• Documentação, tutoriais e materiais de marketing</li>
                  <li>• Inovações, melhorias e desenvolvimentos futuros</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  7.2. Licença de Uso
                </h3>
                <p className="text-muted-foreground">
                  Concedemos a você uma licença limitada, não exclusiva,
                  intransferível e revogável para usar o ToLivre conforme estes
                  termos. Esta licença não confere direitos de propriedade.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  7.3. Seu Conteúdo
                </h3>
                <div className="border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground mb-3">
                    Você mantém todos os direitos sobre o conteúdo que envia
                    para o ToLivre. Ao usar o serviço, você nos concede uma
                    licença mundial, não exclusiva e livre de royalties para:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                    <li>• Hospedar, armazenar e processar seu conteúdo</li>
                    <li>
                      • Fornecer funcionalidades do serviço (notificações,
                      relatórios, etc.)
                    </li>
                    <li>• Fazer backups e garantir a segurança dos dados</li>
                    <li>
                      • Melhorar o serviço através de análises agregadas e
                      anonimizadas
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Importante:</strong> Não utilizamos seu conteúdo
                    para outros fins sem sua autorização expressa.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div id="dados" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold">8. Proteção de Dados</h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                O tratamento de dados pessoais é regido por nossa{" "}
                <Link
                  href="/legal/privacidade"
                  className="text-primary hover:underline"
                >
                  Política de Privacidade
                </Link>
                , que faz parte integrante destes Termos de Uso.
              </p>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h4 className="font-semibold mb-3">Resumo - Seus Dados:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      São protegidos com criptografia e medidas de segurança
                      robustas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      Estão em conformidade com a LGPD (Lei Geral de Proteção de
                      Dados)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      Não são vendidos ou compartilhados sem sua autorização
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      Podem ser acessados, corrigidos ou excluídos mediante
                      solicitação
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      São armazenados em servidores seguros com backup regular
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 9 */}
          <div id="disponibilidade" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold">
                9. Disponibilidade e Manutenção
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  9.1. SLA (Service Level Agreement)
                </h3>
                <div className="border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground mb-3">
                    Nos esforçamos para manter o ToLivre disponível 99.9% do
                    tempo, com as seguintes condições:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                    <li>
                      • Manutenções programadas são comunicadas com 48h de
                      antecedência
                    </li>
                    <li>
                      • Janelas de manutenção geralmente ocorrem em horários de
                      baixo uso
                    </li>
                    <li>
                      • Manutenções emergenciais podem ocorrer sem aviso prévio
                    </li>
                    <li>
                      • Tempo de inatividade para manutenção não conta para o
                      cálculo de uptime
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  9.2. Isenção de Garantias
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                  <p className="text-sm text-yellow-900 dark:text-yellow-100">
                    O serviço é fornecido "como está" e "conforme disponível".
                    Não garantimos que será ininterrupto, livre de erros ou
                    completamente seguro. Você usa o serviço por sua própria
                    conta e risco.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 10 */}
          <div id="limitacao" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-3xl font-bold">
                10. Limitação de Responsabilidade
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-6 rounded-r-lg">
                <p className="text-sm text-red-900 dark:text-red-100 mb-4">
                  <strong>IMPORTANTE - LEIA COM ATENÇÃO:</strong>
                </p>
                <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                  Na máxima extensão permitida pela lei aplicável, o ToLivre e
                  seus representantes NÃO serão responsáveis por:
                </p>
                <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                  <li>
                    • Danos indiretos, incidentais, especiais ou consequenciais
                  </li>
                  <li>
                    • Perda de lucros, receitas, dados, oportunidades de negócio
                    ou boa reputação
                  </li>
                  <li>
                    • Interrupções no serviço, erros ou falhas de segurança
                  </li>
                  <li>
                    • Ações ou omissões de terceiros (incluindo integrações)
                  </li>
                  <li>• Uso indevido do serviço por você ou outros usuários</li>
                  <li>
                    • Perda de dados causada por falha de equipamento ou erro
                    humano
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Limite Máximo de Indenização
                </h3>
                <p className="text-sm text-muted-foreground">
                  Em qualquer caso, nossa responsabilidade total não excederá o
                  valor pago por você nos 12 meses anteriores ao evento que deu
                  origem à reclamação, ou R$ 1.000,00 (mil reais), o que for
                  menor.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Sua Responsabilidade
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Você concorda em indenizar e isentar o ToLivre de quaisquer
                  reclamações, perdas ou danos (incluindo honorários
                  advocatícios) decorrentes de:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li>• Violação destes Termos de Uso</li>
                  <li>• Uso indevido do serviço</li>
                  <li>• Violação de direitos de terceiros</li>
                  <li>• Seu conteúdo ou dados</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 11 */}
          <div id="rescisao" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold">
                11. Rescisão e Cancelamento
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  11.1. Cancelamento por Você
                </h3>
                <p className="text-muted-foreground mb-3">
                  Você pode cancelar sua conta a qualquer momento através das
                  configurações da plataforma:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li>
                    • Planos pagos: Acesso mantido até o final do período pago
                  </li>
                  <li>
                    • Sem reembolso proporcional (exceto garantia de 30 dias)
                  </li>
                  <li>
                    • Dados mantidos por 30 dias após cancelamento para
                    recuperação
                  </li>
                  <li>• Após 30 dias, dados são permanentemente excluídos</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  11.2. Suspensão ou Encerramento por Nós
                </h3>
                <p className="text-muted-foreground mb-3">
                  Podemos suspender ou encerrar sua conta imediatamente, sem
                  aviso prévio, em caso de:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li>• Violação destes Termos de Uso</li>
                  <li>• Atraso de pagamento superior a 30 dias</li>
                  <li>• Uso fraudulento ou abusivo do serviço</li>
                  <li>• Atividade suspeita ou ilegal</li>
                  <li>• Risco à segurança ou integridade da plataforma</li>
                  <li>• Ordem judicial ou requisição de autoridades</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  11.3. Efeitos da Rescisão
                </h3>
                <div className="border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground mb-3">
                    Após o encerramento da conta:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                    <li>
                      • Você perde acesso imediato à plataforma e seus dados
                    </li>
                    <li>• Todas as licenças concedidas são revogadas</li>
                    <li>• Obrigações de pagamento permanecem devidas</li>
                    <li>
                      • Dados podem ser exportados antes do cancelamento
                      definitivo
                    </li>
                    <li>
                      • Cláusulas que sobrevivem: privacidade, propriedade
                      intelectual, limitação de responsabilidade
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 12 */}
          <div id="lei" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold">12. Disposições Gerais</h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  12.1. Lei Aplicável e Foro
                </h3>
                <p className="text-muted-foreground">
                  Estes Termos são regidos pelas leis da República Federativa do
                  Brasil. Fica eleito o foro da Comarca de São Paulo/SP para
                  dirimir quaisquer controvérsias, com exclusão de qualquer
                  outro, por mais privilegiado que seja.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  12.2. Alterações nos Termos
                </h3>
                <p className="text-muted-foreground mb-3">
                  Podemos modificar estes termos a qualquer momento. Alterações
                  significativas serão notificadas com 30 dias de antecedência
                  por e-mail ou através da plataforma.
                </p>
                <p className="text-sm text-muted-foreground">
                  O uso continuado do serviço após as alterações constitui
                  aceitação dos novos termos. Se não concordar, você deve
                  cancelar sua conta.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">12.3. Cessão</h3>
                <p className="text-sm text-muted-foreground">
                  Você não pode transferir ou ceder seus direitos ou obrigações
                  sem nosso consentimento prévio por escrito. Podemos ceder
                  estes termos a qualquer momento, especialmente em caso de
                  fusão, aquisição ou venda de ativos.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  12.4. Independência das Cláusulas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Se qualquer disposição destes termos for considerada inválida
                  ou inexequível, as demais disposições permanecerão em pleno
                  vigor e efeito.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  12.5. Acordo Integral
                </h3>
                <p className="text-sm text-muted-foreground">
                  Estes Termos, juntamente com a Política de Privacidade,
                  constituem o acordo integral entre você e o ToLivre,
                  substituindo todos os acordos anteriores relacionados ao
                  serviço.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">12.6. Renúncia</h3>
                <p className="text-sm text-muted-foreground">
                  A falha em exercer qualquer direito ou disposição destes
                  termos não constituirá renúncia a tal direito ou disposição.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-primary/10 rounded-2xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">
              Dúvidas sobre os Termos?
            </h2>
            <p className="text-muted-foreground mb-6">
              Se você tiver dúvidas sobre estes Termos de Uso ou precisar de
              esclarecimentos, entre em contato conosco:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Contato Legal</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>E-mail:</strong> legal@tolivre.com.br
                  </p>
                  <p>
                    <strong>Jurídico:</strong> juridico@tolivre.com.br
                  </p>
                  <p>
                    <strong>Telefone:</strong> (11) 9999-9999
                  </p>
                  <p>
                    <strong>Horário:</strong> Segunda a Sexta, 9h às 18h
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Endereço da Empresa</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>ToLivre Tecnologia Ltda.</strong>
                  </p>
                  <p>CNPJ: 00.000.000/0001-00</p>
                  <p>Rua Exemplo, 123 - Sala 456</p>
                  <p>São Paulo/SP - CEP 00000-000</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Última atualização:</strong> 1 de dezembro de 2025
                <br />
                <strong>Versão:</strong> 1.0
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Ao criar sua conta, você concorda com estes Termos de Uso e nossa
            Política de Privacidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-600"
              >
                Criar Conta Grátis
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
