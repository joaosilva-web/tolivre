import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Shield,
  Lock,
  Server,
  Eye,
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
} from "lucide-react";

export default function SegurancaPage() {
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
      <section className="py-20 px-4 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
            <Shield className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Segurança e Proteção de Dados
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Última atualização: 1 de dezembro de 2025
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A segurança dos seus dados é nossa prioridade absoluta. Conheça
            todas as medidas que implementamos para proteger suas informações e
            garantir a continuidade do seu negócio.
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
              <a href="#compromisso" className="text-primary hover:underline">
                1. Nosso Compromisso
              </a>
              <a
                href="#infraestrutura"
                className="text-primary hover:underline"
              >
                2. Infraestrutura Segura
              </a>
              <a href="#criptografia" className="text-primary hover:underline">
                3. Criptografia de Dados
              </a>
              <a href="#acesso" className="text-primary hover:underline">
                4. Controle de Acesso
              </a>
              <a href="#monitoramento" className="text-primary hover:underline">
                5. Monitoramento 24/7
              </a>
              <a href="#backup" className="text-primary hover:underline">
                6. Backup e Recuperação
              </a>
              <a href="#conformidade" className="text-primary hover:underline">
                7. Conformidade Legal
              </a>
              <a href="#auditoria" className="text-primary hover:underline">
                8. Auditorias e Certificações
              </a>
              <a href="#incidentes" className="text-primary hover:underline">
                9. Resposta a Incidentes
              </a>
              <a href="#equipe" className="text-primary hover:underline">
                10. Treinamento da Equipe
              </a>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
              <h3 className="text-green-900 dark:text-green-100 mt-0 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança em Primeiro Lugar
              </h3>
              <p className="text-green-800 dark:text-green-200 mb-0">
                No ToLivre, implementamos múltiplas camadas de segurança para
                proteger seus dados contra acessos não autorizados, perda,
                destruição ou alteração. Nossa infraestrutura é construída sobre
                as melhores práticas da indústria e padrões internacionais de
                segurança.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div id="compromisso" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold">
                1. Nosso Compromisso com a Segurança
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                Entendemos que você confia seus dados e os dados dos seus
                clientes a nós. Levamos essa responsabilidade muito a sério e
                nos comprometemos a:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Proteção Contínua</h4>
                      <p className="text-sm text-muted-foreground">
                        Manter medidas de segurança atualizadas e eficazes
                        contra ameaças emergentes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">
                        Transparência Total
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Comunicar claramente nossas práticas de segurança e
                        qualquer incidente relevante
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">
                        Investimento Constante
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Dedicar recursos significativos para infraestrutura e
                        tecnologias de segurança
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">
                        Conformidade Rigorosa
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Aderir a regulamentações e padrões internacionais de
                        proteção de dados
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div id="infraestrutura" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold">2. Infraestrutura Segura</h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  2.1. Hospedagem em Nuvem
                </h3>
                <div className="bg-card border rounded-lg p-5">
                  <p className="text-muted-foreground mb-4">
                    Nossa infraestrutura é hospedada em provedores de nuvem
                    líderes do mercado, que oferecem:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Data Centers Tier III/IV:</strong> Redundância
                        de energia, refrigeração e conectividade
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Certificações ISO 27001:</strong> Gestão de
                        segurança da informação
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>SOC 2 Type II:</strong> Auditoria independente
                        de controles de segurança
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Conformidade PCI DSS:</strong> Padrões de
                        segurança para processamento de pagamentos
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Proteção DDoS:</strong> Mitigação automática de
                        ataques de negação de serviço
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  2.2. Arquitetura de Rede
                </h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Segregação de Redes</h4>
                    <p className="text-sm text-muted-foreground">
                      Separação completa entre ambientes de produção,
                      desenvolvimento e testes. Cada camada possui controles de
                      acesso específicos.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      Firewall de Aplicação Web (WAF)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Proteção contra ataques comuns como SQL Injection, XSS,
                      CSRF e outras vulnerabilidades do OWASP Top 10.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      Balanceamento de Carga
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Distribuição inteligente de tráfego para garantir
                      disponibilidade e performance, com failover automático.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  2.3. Redundância e Alta Disponibilidade
                </h3>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
                  <ul className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
                    <li>
                      • <strong>Multi-zona:</strong> Servidores distribuídos em
                      múltiplas zonas de disponibilidade
                    </li>
                    <li>
                      • <strong>Replicação de Dados:</strong> Banco de dados
                      replicado em tempo real para garantir consistência
                    </li>
                    <li>
                      • <strong>Auto-scaling:</strong> Capacidade de escalar
                      automaticamente conforme demanda
                    </li>
                    <li>
                      • <strong>Uptime 99.9%:</strong> Garantia de
                      disponibilidade do serviço
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div id="criptografia" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold">3. Criptografia de Dados</h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  3.1. Dados em Trânsito
                </h3>
                <div className="bg-card border rounded-lg p-5">
                  <p className="text-muted-foreground mb-4">
                    Toda comunicação entre você e nossos servidores é protegida:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-purple-500 mt-1" />
                      <span>
                        <strong>TLS 1.3:</strong> Protocolo de criptografia de
                        última geração
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-purple-500 mt-1" />
                      <span>
                        <strong>Certificado SSL:</strong> Validação estendida
                        (EV SSL) para máxima confiança
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-purple-500 mt-1" />
                      <span>
                        <strong>HSTS:</strong> HTTP Strict Transport Security
                        para prevenir ataques
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-purple-500 mt-1" />
                      <span>
                        <strong>Perfect Forward Secrecy:</strong> Proteção
                        adicional contra comprometimento de chaves
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  3.2. Dados em Repouso
                </h3>
                <div className="bg-card border rounded-lg p-5">
                  <p className="text-muted-foreground mb-4">
                    Todos os dados armazenados são criptografados:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-purple-500 mt-1" />
                      <span>
                        <strong>AES-256:</strong> Criptografia de nível militar
                        para dados sensíveis
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-purple-500 mt-1" />
                      <span>
                        <strong>Senhas Hasheadas:</strong> Bcrypt com salt para
                        armazenamento seguro de credenciais
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-purple-500 mt-1" />
                      <span>
                        <strong>Chaves Rotacionadas:</strong> Rotação periódica
                        de chaves de criptografia
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-purple-500 mt-1" />
                      <span>
                        <strong>Dados Tokenizados:</strong> Informações de
                        pagamento protegidas via tokenização
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  3.3. Gestão de Chaves
                </h3>
                <p className="text-sm text-muted-foreground">
                  Utilizamos serviços gerenciados de chaves (KMS - Key
                  Management Service) para armazenamento seguro e controle de
                  acesso às chaves de criptografia. As chaves são protegidas por
                  Hardware Security Modules (HSM) certificados.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="acesso" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold">4. Controle de Acesso</h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  4.1. Autenticação de Usuários
                </h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Autenticação Segura</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Senhas com requisitos mínimos de complexidade</li>
                      <li>• Tokens JWT com expiração automática</li>
                      <li>• Cookies httpOnly para prevenir XSS</li>
                      <li>• Proteção contra ataques de força bruta</li>
                      <li>• Limitação de tentativas de login</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      Autenticação Multi-Fator (2FA)
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Disponível para todas as contas, especialmente recomendado
                      para:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • Proprietários e administradores de contas corporativas
                      </li>
                      <li>• Usuários com acesso a dados sensíveis</li>
                      <li>• Contas com permissões financeiras</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Gestão de Sessões</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Timeout automático após inatividade</li>
                      <li>• Logout em todos os dispositivos disponível</li>
                      <li>• Notificação de novos logins</li>
                      <li>• Histórico de acessos por dispositivo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  4.2. Controle de Acesso Interno
                </h3>
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-5">
                  <p className="text-sm text-orange-900 dark:text-orange-100 mb-3">
                    <strong>Princípio do Menor Privilégio:</strong>
                  </p>
                  <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                    <li>
                      • Acesso aos dados concedido apenas quando estritamente
                      necessário
                    </li>
                    <li>• Revisão periódica de permissões de acesso</li>
                    <li>
                      • Aprovação em múltiplas etapas para operações críticas
                    </li>
                    <li>
                      • Auditoria completa de todos os acessos a dados de
                      produção
                    </li>
                    <li>• Segregação de funções entre equipes técnicas</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  4.3. Controle de Acesso por Função (RBAC)
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Implementamos um sistema robusto de controle baseado em
                  funções:
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">OWNER</h4>
                    <p className="text-xs text-muted-foreground">
                      Controle total sobre a conta, incluindo configurações de
                      segurança e faturamento
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">MANAGER</h4>
                    <p className="text-xs text-muted-foreground">
                      Gestão de equipe, serviços e relatórios, sem acesso a
                      configurações críticas
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">EMPLOYEE</h4>
                    <p className="text-xs text-muted-foreground">
                      Acesso limitado a agendamentos e clientes atribuídos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div id="monitoramento" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-3xl font-bold">
                5. Monitoramento e Detecção 24/7
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                Nossa infraestrutura é monitorada continuamente para detectar e
                responder rapidamente a qualquer ameaça ou anomalia.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-red-500" />
                    Monitoramento de Segurança
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Detecção de intrusões em tempo real</li>
                    <li>• Análise comportamental de usuários</li>
                    <li>• Identificação de padrões suspeitos</li>
                    <li>• Alertas automáticos para atividades anômamas</li>
                    <li>• SIEM (Security Information and Event Management)</li>
                  </ul>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Server className="w-5 h-5 text-blue-500" />
                    Monitoramento de Infraestrutura
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Métricas de performance em tempo real</li>
                    <li>• Alertas de disponibilidade e latência</li>
                    <li>• Rastreamento de erros e exceções</li>
                    <li>• Análise de logs centralizada</li>
                    <li>• Dashboards de saúde do sistema</li>
                  </ul>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Detecção de Vulnerabilidades
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Varreduras automatizadas semanais</li>
                    <li>• Testes de penetração semestrais</li>
                    <li>• Análise de dependências e bibliotecas</li>
                    <li>• Verificação de conformidade OWASP</li>
                    <li>• Bug bounty program para pesquisadores</li>
                  </ul>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-500" />
                    Auditoria de Logs
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Registro completo de todas as atividades</li>
                    <li>• Logs imutáveis e timestamped</li>
                    <li>• Retenção de logs por 12 meses</li>
                    <li>• Rastreabilidade de ações administrativas</li>
                    <li>• Conformidade com requisitos legais</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div id="backup" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold">
                6. Backup e Recuperação de Desastres
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  6.1. Estratégia de Backup
                </h3>
                <div className="bg-card border rounded-lg p-5">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <div>
                        <strong>Backups Automáticos Diários:</strong> Todos os
                        dados são copiados diariamente para locais
                        geograficamente separados
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <div>
                        <strong>Retenção de 30 Dias:</strong> Mantemos backups
                        dos últimos 30 dias para recuperação de dados históricos
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <div>
                        <strong>Backups Criptografados:</strong> Todos os
                        backups são criptografados em repouso e em trânsito
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <div>
                        <strong>Testes Regulares:</strong> Realizamos testes
                        mensais de restauração para garantir a integridade dos
                        backups
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <div>
                        <strong>Point-in-Time Recovery:</strong> Capacidade de
                        restaurar dados para qualquer momento específico
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  6.2. Plano de Recuperação de Desastres (DRP)
                </h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">
                        RTO (Recovery Time Objective)
                      </h4>
                      <span className="text-sm font-semibold text-primary">
                        &lt; 4 horas
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tempo máximo para restaurar o serviço após uma interrupção
                      crítica
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">
                        RPO (Recovery Point Objective)
                      </h4>
                      <span className="text-sm font-semibold text-primary">
                        &lt; 1 hora
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Perda máxima aceitável de dados em caso de incidente
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  6.3. Continuidade de Negócios
                </h3>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
                  <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                    Nosso plano de continuidade inclui:
                  </p>
                  <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li>
                      • Infraestrutura redundante em múltiplas regiões
                      geográficas
                    </li>
                    <li>
                      • Failover automático em caso de falha de servidores
                    </li>
                    <li>• Equipe de resposta a emergências disponível 24/7</li>
                    <li>
                      • Procedimentos documentados para diversos cenários de
                      desastre
                    </li>
                    <li>• Simulações anuais de recuperação de desastres</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div id="conformidade" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold">
                7. Conformidade Legal e Regulatória
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  7.1. LGPD (Lei Geral de Proteção de Dados)
                </h3>
                <div className="bg-card border rounded-lg p-5">
                  <p className="text-muted-foreground mb-4">
                    Estamos em total conformidade com a LGPD (Lei 13.709/2018):
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• DPO (Encarregado de Dados) designado e disponível</li>
                    <li>
                      • Relatórios de Impacto à Proteção de Dados (RIPD)
                      atualizados
                    </li>
                    <li>• Registro de operações de tratamento de dados</li>
                    <li>
                      • Processos para exercício de direitos dos titulares
                    </li>
                    <li>
                      • Notificação de incidentes à ANPD conforme legislação
                    </li>
                    <li>• Bases legais claras para cada tratamento de dados</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  7.2. Outras Conformidades
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      Marco Civil da Internet
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Cumprimos todas as obrigações estabelecidas pela Lei
                      12.965/2014, incluindo guarda de registros de acesso.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      Código de Defesa do Consumidor
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Transparência nas relações de consumo e garantia de
                      direitos básicos dos usuários conforme Lei 8.078/1990.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      PCI DSS (Payment Card Industry)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Processamento seguro de pagamentos seguindo os padrões da
                      indústria de cartões de crédito.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      GDPR (General Data Protection Regulation)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Alinhamento com regulamentação europeia para eventuais
                      clientes internacionais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div id="auditoria" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold">
                8. Auditorias e Certificações
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  8.1. Auditorias Externas
                </h3>
                <p className="text-muted-foreground mb-4">
                  Submetemos nossa infraestrutura e processos a auditorias
                  regulares por empresas independentes especializadas em
                  segurança da informação:
                </p>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      Auditoria Anual de Segurança
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Avaliação completa de controles de segurança, políticas e
                      procedimentos
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      Testes de Penetração (Pentest)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Simulações de ataques por especialistas éticos para
                      identificar vulnerabilidades
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Revisão de Código</h4>
                    <p className="text-sm text-muted-foreground">
                      Análise estática e dinâmica de código por ferramentas e
                      especialistas
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  8.2. Certificações em Progresso
                </h3>
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
                  <p className="text-sm text-purple-900 dark:text-purple-100 mb-3">
                    Estamos trabalhando ativamente para obter as seguintes
                    certificações:
                  </p>
                  <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                    <li>
                      • <strong>ISO 27001:</strong> Gestão de Segurança da
                      Informação (previsão: Q2 2026)
                    </li>
                    <li>
                      • <strong>SOC 2 Type II:</strong> Controles de segurança e
                      disponibilidade (previsão: Q3 2026)
                    </li>
                    <li>
                      • <strong>ISO 27701:</strong> Gestão de Privacidade
                      (previsão: Q4 2026)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 9 */}
          <div id="incidentes" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-3xl font-bold">
                9. Resposta a Incidentes de Segurança
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  9.1. Processo de Resposta
                </h3>
                <p className="text-muted-foreground mb-4">
                  Mantemos um processo estruturado para identificar, conter e
                  remediar incidentes de segurança:
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="flex-grow border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">
                        Detecção e Identificação
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Sistemas automatizados e equipe de segurança monitoram
                        continuamente para detectar anomalias e possíveis
                        incidentes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="flex-grow border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Contenção</h4>
                      <p className="text-sm text-muted-foreground">
                        Ações imediatas para isolar e limitar o impacto do
                        incidente, prevenindo propagação.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div className="flex-grow border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">
                        Análise e Investigação
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Investigação detalhada da causa raiz, extensão do
                        comprometimento e dados potencialmente afetados.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                      4
                    </div>
                    <div className="flex-grow border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">
                        Erradicação e Recuperação
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Remoção completa da ameaça e restauração segura dos
                        sistemas e dados afetados.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                      5
                    </div>
                    <div className="flex-grow border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">
                        Comunicação e Lições Aprendidas
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Notificação aos afetados conforme legislação,
                        documentação do incidente e implementação de melhorias.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  9.2. Notificação de Incidentes
                </h3>
                <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <p className="text-sm text-red-900 dark:text-red-100 mb-3">
                    <strong>Nosso compromisso com transparência:</strong>
                  </p>
                  <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                    <li>
                      • Notificação à ANPD em até 72 horas (conforme LGPD)
                    </li>
                    <li>• Comunicação imediata aos usuários afetados</li>
                    <li>
                      • Informações claras sobre o incidente e medidas tomadas
                    </li>
                    <li>
                      • Orientações sobre ações que os usuários devem tomar
                    </li>
                    <li>
                      • Atualizações regulares durante investigação e remediação
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  9.3. Reporte de Vulnerabilidades
                </h3>
                <div className="border rounded-lg p-5">
                  <p className="text-sm text-muted-foreground mb-3">
                    Se você descobrir uma vulnerabilidade de segurança, pedimos
                    que nos informe de forma responsável:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      • <strong>E-mail:</strong> security@tolivre.com.br
                    </li>
                    <li>
                      • <strong>PGP Key:</strong> Disponível em nosso site
                    </li>
                    <li>
                      • <strong>Resposta:</strong> Confirmação em até 48 horas
                    </li>
                    <li>
                      • <strong>Resolução:</strong> Prazo de 90 dias para
                      correção crítica
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-3">
                    Agradecemos pesquisadores de segurança responsáveis e
                    reconhecemos publicamente suas contribuições (com
                    permissão).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 10 */}
          <div id="equipe" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold">
                10. Treinamento e Conscientização da Equipe
              </h2>
            </div>

            <div className="space-y-6 ml-13">
              <p className="text-muted-foreground">
                Reconhecemos que a segurança é responsabilidade de todos. Por
                isso, investimos fortemente no treinamento contínuo de nossa
                equipe.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-3">
                    Treinamento Obrigatório
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Onboarding de segurança para novos funcionários</li>
                    <li>• Treinamento anual de atualização</li>
                    <li>• Certificações específicas para equipe técnica</li>
                    <li>• Simulações de phishing e engenharia social</li>
                  </ul>
                </div>

                <div className="bg-card border rounded-lg p-5">
                  <h4 className="font-semibold mb-3">Tópicos Abordados</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Melhores práticas de segurança</li>
                    <li>• Proteção de dados e privacidade</li>
                    <li>• Identificação e resposta a ameaças</li>
                    <li>• Conformidade legal e regulatória</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Cultura de Segurança
                </h3>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
                  <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                    Promovemos uma cultura onde:
                  </p>
                  <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li>
                      • Segurança é prioridade em todas as decisões de produto
                    </li>
                    <li>
                      • Todos sentem-se capacitados para reportar preocupações
                    </li>
                    <li>
                      • Erros são tratados como oportunidades de aprendizado
                    </li>
                    <li>
                      • Inovação em segurança é reconhecida e recompensada
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-green-500/10 via-blue-500/10 to-primary/10 rounded-2xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">
              Contato da Equipe de Segurança
            </h2>
            <p className="text-muted-foreground mb-6">
              Se você tiver dúvidas sobre nossa segurança, encontrar uma
              vulnerabilidade ou precisar reportar um incidente, entre em
              contato:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Segurança da Informação</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>E-mail:</strong> security@tolivre.com.br
                  </p>
                  <p>
                    <strong>E-mail Criptografado:</strong> Chave PGP disponível
                  </p>
                  <p>
                    <strong>Emergências:</strong> +55 (11) 9999-9999
                  </p>
                  <p>
                    <strong>Disponibilidade:</strong> 24 horas por dia, 7 dias
                    por semana
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  Encarregado de Dados (DPO)
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Nome:</strong> Dr. Carlos Santos
                  </p>
                  <p>
                    <strong>E-mail:</strong> dpo@tolivre.com.br
                  </p>
                  <p>
                    <strong>Telefone:</strong> (11) 9999-9999
                  </p>
                  <p>
                    <strong>Horário:</strong> Segunda a Sexta, 9h às 18h
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Endereço:</strong> ToLivre Tecnologia Ltda. - Rua
                Exemplo, 123 - São Paulo/SP
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Última atualização desta página:</strong> 1 de dezembro
                de 2025
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 mt-8">
            <h3 className="text-xl font-bold mb-4">
              Transparência e Melhoria Contínua
            </h3>
            <p className="text-muted-foreground mb-4">
              A segurança é uma jornada, não um destino. Estamos constantemente
              atualizando nossas práticas, tecnologias e processos para nos
              manter à frente das ameaças emergentes.
            </p>
            <p className="text-muted-foreground mb-4">
              Esta página é atualizada regularmente para refletir melhorias em
              nossa postura de segurança. Recomendamos que você a revisite
              periodicamente.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/legal/privacidade">
                <Button variant="outline" size="sm">
                  Ver Política de Privacidade
                </Button>
              </Link>
              <Link href="/legal/termos">
                <Button variant="outline" size="sm">
                  Ver Termos de Uso
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Seus dados estão seguros conosco
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Comece a usar o ToLivre com a tranquilidade de saber que sua
            segurança é nossa prioridade.
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
