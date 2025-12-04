import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  FileText,
} from "lucide-react";

export default function PrivacidadePage() {
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
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
            Política de Privacidade
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Última atualização: 1 de dezembro de 2025
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sua privacidade é fundamental para nós. Esta política explica como
            coletamos, usamos, armazenamos e protegemos seus dados pessoais.
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
              <a href="#coleta" className="text-primary hover:underline">
                1. Coleta de Informações
              </a>
              <a href="#uso" className="text-primary hover:underline">
                2. Uso das Informações
              </a>
              <a
                href="#compartilhamento"
                className="text-primary hover:underline"
              >
                3. Compartilhamento de Dados
              </a>
              <a href="#seguranca" className="text-primary hover:underline">
                4. Segurança
              </a>
              <a href="#cookies" className="text-primary hover:underline">
                5. Cookies
              </a>
              <a href="#direitos" className="text-primary hover:underline">
                6. Seus Direitos
              </a>
              <a href="#retencao" className="text-primary hover:underline">
                7. Retenção de Dados
              </a>
              <a href="#alteracoes" className="text-primary hover:underline">
                8. Alterações na Política
              </a>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="text-blue-900 dark:text-blue-100 mt-0 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Compromisso com a LGPD
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-0">
                O ToLivre está em total conformidade com a Lei Geral de Proteção
                de Dados (LGPD - Lei nº 13.709/2018). Tratamos seus dados com o
                máximo cuidado e transparência, respeitando todos os seus
                direitos como titular de dados.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div id="coleta" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">1. Coleta de Informações</h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  1.1. Informações que Você Fornece
                </h3>
                <p className="text-muted-foreground mb-4">
                  Coletamos informações que você nos fornece diretamente ao:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Criar uma conta:</strong> nome, e-mail, telefone,
                      senha (criptografada)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Usar o serviço:</strong> informações de
                      agendamentos, serviços prestados, horários de trabalho
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Cadastrar clientes:</strong> nome, telefone,
                      e-mail, histórico de atendimentos
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Entrar em contato conosco:</strong> mensagens,
                      feedbacks, solicitações de suporte
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Processar pagamentos:</strong> informações de
                      cobrança (processadas por terceiros seguros)
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  1.2. Informações Coletadas Automaticamente
                </h3>
                <p className="text-muted-foreground mb-4">
                  Quando você usa o ToLivre, coletamos automaticamente:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Dados de uso:</strong> páginas visitadas,
                      funcionalidades utilizadas, tempo de sessão
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Informações do dispositivo:</strong> tipo de
                      dispositivo, sistema operacional, navegador
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Endereço IP:</strong> para segurança e localização
                      aproximada
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Cookies e tecnologias similares:</strong> para
                      melhorar sua experiência
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div id="uso" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold">2. Uso das Informações</h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                Utilizamos suas informações para as seguintes finalidades:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-2">Prestação do Serviço</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Gerenciar sua conta</li>
                    <li>• Processar agendamentos</li>
                    <li>• Enviar notificações</li>
                    <li>• Fornecer suporte técnico</li>
                  </ul>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-2">Melhorias e Análises</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Analisar uso da plataforma</li>
                    <li>• Desenvolver novos recursos</li>
                    <li>• Corrigir problemas técnicos</li>
                    <li>• Otimizar performance</li>
                  </ul>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-2">Comunicação</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Atualizações do serviço</li>
                    <li>• Newsletters (com opt-in)</li>
                    <li>• Ofertas personalizadas</li>
                    <li>• Pesquisas de satisfação</li>
                  </ul>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-2">Segurança e Compliance</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Prevenir fraudes</li>
                    <li>• Proteger contra abusos</li>
                    <li>• Cumprir obrigações legais</li>
                    <li>• Resolver disputas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div id="compartilhamento" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold">
                3. Compartilhamento de Dados
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <p className="text-yellow-900 dark:text-yellow-100 mb-0">
                  <strong>Importante:</strong> Nunca vendemos seus dados
                  pessoais para terceiros. Compartilhamos informações apenas nas
                  situações específicas descritas abaixo.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  3.1. Compartilhamento Autorizado
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold mb-2">Com Seus Clientes</h4>
                    <p className="text-muted-foreground text-sm">
                      Informações necessárias para agendamentos (nome do
                      profissional, horário, serviço) são compartilhadas com
                      seus clientes via WhatsApp ou e-mail.
                    </p>
                  </div>

                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold mb-2">
                      Prestadores de Serviço
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Parceiros que nos ajudam a operar, como provedores de
                      hospedagem, processadores de pagamento, e serviços de
                      comunicação (todos com contratos de confidencialidade).
                    </p>
                  </div>

                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold mb-2">Obrigações Legais</h4>
                    <p className="text-muted-foreground text-sm">
                      Quando exigido por lei, ordem judicial, ou autoridades
                      governamentais competentes.
                    </p>
                  </div>

                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold mb-2">Proteção de Direitos</h4>
                    <p className="text-muted-foreground text-sm">
                      Para proteger nossos direitos, propriedade, ou segurança,
                      bem como de nossos usuários.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="seguranca" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold">4. Segurança dos Dados</h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                Implementamos medidas técnicas e organizacionais robustas para
                proteger seus dados:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5 text-green-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Criptografia</h4>
                  <p className="text-sm text-muted-foreground">
                    Todos os dados em trânsito são protegidos com SSL/TLS.
                    Senhas são criptografadas usando algoritmos seguros
                    (bcrypt).
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5 text-blue-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Infraestrutura Segura</h4>
                  <p className="text-sm text-muted-foreground">
                    Servidores em datacenters certificados com firewalls,
                    monitoramento 24/7 e backups regulares.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                    <UserCheck className="w-5 h-5 text-purple-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Controle de Acesso</h4>
                  <p className="text-sm text-muted-foreground">
                    Acesso restrito aos dados apenas para funcionários
                    autorizados, com autenticação de dois fatores (2FA).
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3">
                    <Eye className="w-5 h-5 text-orange-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Monitoramento</h4>
                  <p className="text-sm text-muted-foreground">
                    Logs de auditoria, detecção de anomalias e resposta rápida a
                    incidentes de segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div id="cookies" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold">
                5. Cookies e Tecnologias Similares
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                Utilizamos cookies e tecnologias similares para melhorar sua
                experiência:
              </p>

              <div className="space-y-4">
                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Cookies Essenciais</h4>
                    <span className="text-xs bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                      Obrigatório
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Necessários para o funcionamento básico do site (login,
                    sessões, segurança).
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Cookies de Desempenho</h4>
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                      Opcional
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Coletam informações sobre como você usa o site para melhorar
                    performance.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Cookies de Funcionalidade</h4>
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                      Opcional
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lembram suas preferências e escolhas (idioma, tema,
                    configurações).
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Cookies de Marketing</h4>
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                      Opcional
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rastreiam sua atividade para personalizar anúncios e
                    ofertas.
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Você pode gerenciar suas preferências de cookies nas
                configurações do seu navegador. Note que desabilitar alguns
                cookies pode afetar a funcionalidade do site.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div id="direitos" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">6. Seus Direitos (LGPD)</h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                De acordo com a LGPD, você tem os seguintes direitos sobre seus
                dados pessoais:
              </p>

              <div className="grid gap-4">
                <div className="bg-card border-l-4 border-primary rounded-r-lg p-5">
                  <h4 className="font-semibold mb-2">✓ Acesso</h4>
                  <p className="text-sm text-muted-foreground">
                    Confirmar se tratamos seus dados e solicitar uma cópia
                    deles.
                  </p>
                </div>

                <div className="bg-card border-l-4 border-blue-500 rounded-r-lg p-5">
                  <h4 className="font-semibold mb-2">✓ Correção</h4>
                  <p className="text-sm text-muted-foreground">
                    Atualizar dados incompletos, inexatos ou desatualizados.
                  </p>
                </div>

                <div className="bg-card border-l-4 border-purple-500 rounded-r-lg p-5">
                  <h4 className="font-semibold mb-2">
                    ✓ Anonimização, Bloqueio ou Eliminação
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Solicitar anonimização, bloqueio ou eliminação de dados
                    desnecessários, excessivos ou tratados em desconformidade.
                  </p>
                </div>

                <div className="bg-card border-l-4 border-green-500 rounded-r-lg p-5">
                  <h4 className="font-semibold mb-2">✓ Portabilidade</h4>
                  <p className="text-sm text-muted-foreground">
                    Receber seus dados em formato estruturado e interoperável.
                  </p>
                </div>

                <div className="bg-card border-l-4 border-orange-500 rounded-r-lg p-5">
                  <h4 className="font-semibold mb-2">
                    ✓ Revogação de Consentimento
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Revogar seu consentimento a qualquer momento, sem prejudicar
                    o tratamento anterior.
                  </p>
                </div>

                <div className="bg-card border-l-4 border-red-500 rounded-r-lg p-5">
                  <h4 className="font-semibold mb-2">✓ Oposição</h4>
                  <p className="text-sm text-muted-foreground">
                    Opor-se a tratamentos realizados sem seu consentimento.
                  </p>
                </div>

                <div className="bg-card border-l-4 border-yellow-500 rounded-r-lg p-5">
                  <h4 className="font-semibold mb-2">
                    ✓ Informação sobre Compartilhamento
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Saber com quais entidades públicas e privadas compartilhamos
                    seus dados.
                  </p>
                </div>

                <div className="bg-card border-l-4 border-pink-500 rounded-r-lg p-5">
                  <h4 className="font-semibold mb-2">✓ Não Consentimento</h4>
                  <p className="text-sm text-muted-foreground">
                    Informar-se sobre a possibilidade e as consequências de não
                    fornecer consentimento.
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h4 className="font-semibold mb-3">
                  Como Exercer Seus Direitos
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Para exercer qualquer um desses direitos, entre em contato
                  conosco:
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>E-mail:</strong> privacidade@tolivre.com.br
                  </p>
                  <p>
                    <strong>Prazo de resposta:</strong> até 15 dias úteis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div id="retencao" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold">7. Retenção de Dados</h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                Mantemos seus dados pessoais apenas pelo tempo necessário para
                as finalidades declaradas:
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-5">
                  <h4 className="font-semibold mb-2">Dados de Conta Ativa</h4>
                  <p className="text-sm text-muted-foreground">
                    Enquanto sua conta estiver ativa e você usar nossos
                    serviços.
                  </p>
                </div>

                <div className="border rounded-lg p-5">
                  <h4 className="font-semibold mb-2">
                    Dados Fiscais e Contábeis
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Pelo período exigido por lei (geralmente 5 anos após o
                    encerramento da conta).
                  </p>
                </div>

                <div className="border rounded-lg p-5">
                  <h4 className="font-semibold mb-2">Dados de Marketing</h4>
                  <p className="text-sm text-muted-foreground">
                    Até que você cancele sua inscrição ou solicite a exclusão.
                  </p>
                </div>

                <div className="border rounded-lg p-5">
                  <h4 className="font-semibold mb-2">Logs de Segurança</h4>
                  <p className="text-sm text-muted-foreground">
                    Por até 6 meses, conforme exigido por regulações de
                    segurança.
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Após o período de retenção, os dados são excluídos de forma
                segura ou anonimizados para fins estatísticos, de forma que não
                possam mais ser associados a você.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div id="alteracoes" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold">
                8. Alterações nesta Política
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                Podemos atualizar esta Política de Privacidade periodicamente
                para refletir mudanças em nossas práticas, tecnologias,
                requisitos legais ou por outros motivos operacionais.
              </p>

              <div className="bg-card border rounded-lg p-6">
                <h4 className="font-semibold mb-3">
                  Notificação de Alterações
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Publicaremos a versão atualizada nesta página</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Atualizaremos a data de "Última atualização" no topo
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Para alterações significativas, notificaremos você por
                      e-mail
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Recomendamos revisar esta política periodicamente
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Contato e DPO</h2>
            <p className="text-muted-foreground mb-6">
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre
              como tratamos seus dados, entre em contato com nosso Encarregado
              de Proteção de Dados (DPO):
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Dados de Contato</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>E-mail:</strong> privacidade@tolivre.com.br
                  </p>
                  <p>
                    <strong>DPO:</strong> dpo@tolivre.com.br
                  </p>
                  <p>
                    <strong>Telefone:</strong> (11) 9999-9999
                  </p>
                  <p>
                    <strong>Endereço:</strong> Rua Exemplo, 123 - São Paulo/SP
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Prazo de Resposta</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Respondemos solicitações em até{" "}
                    <strong>15 dias úteis</strong>
                  </p>
                  <p>
                    Casos complexos podem exigir extensão de prazo
                    (notificaremos você)
                  </p>
                  <p>
                    Todas as solicitações são tratadas com confidencialidade
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Você também pode registrar uma reclamação junto à Autoridade
                Nacional de Proteção de Dados (ANPD) se acreditar que o
                tratamento de seus dados viola a LGPD.
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
            Junte-se a milhares de profissionais que confiam no ToLivre para
            gerenciar seus agendamentos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-600"
              >
                Começar Grátis
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
