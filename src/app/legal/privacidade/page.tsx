import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="TôLivre"
                width={32}
                height={32}
                className="rounded-lg"
              />
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

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-primary">
                Política de Privacidade
              </h1>
              <p className="text-muted-foreground">
                Última atualização: Janeiro de 2026
              </p>
            </div>

            <div className="prose prose-slate max-w-none">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  1. Introdução
                </h2>
                <p className="text-muted-foreground">
                  A TôLivre (&quot;nós&quot;, &quot;nosso&quot; ou
                  &quot;plataforma&quot;) está comprometida em proteger sua
                  privacidade. Esta Política de Privacidade descreve como
                  coletamos, usamos, armazenamos e compartilhamos suas
                  informações pessoais quando você utiliza nossa plataforma de
                  agendamento online.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  2. Informações que Coletamos
                </h2>
                <p className="text-muted-foreground">Coletamos:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    <strong>Informações de cadastro:</strong> nome, e-mail,
                    telefone, CPF/CNPJ
                  </li>
                  <li>
                    <strong>Informações de negócio:</strong> nome da empresa,
                    endereço, serviços oferecidos
                  </li>
                  <li>
                    <strong>Dados de agendamento:</strong> horários, serviços,
                    clientes
                  </li>
                  <li>
                    <strong>Informações de pagamento:</strong> dados de cartão
                    (processados via Stripe/Mercado Pago)
                  </li>
                  <li>
                    <strong>Dados de uso:</strong> logs, IP, navegador,
                    dispositivo
                  </li>
                  <li>
                    <strong>Comunicações:</strong> mensagens via WhatsApp,
                    e-mail, chat
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  3. Como Usamos suas Informações
                </h2>
                <p className="text-muted-foreground">
                  Utilizamos seus dados para:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Fornecer e manter nossos serviços</li>
                  <li>Processar agendamentos e pagamentos</li>
                  <li>Enviar notificações e lembretes</li>
                  <li>Melhorar e personalizar sua experiência</li>
                  <li>Fornecer suporte ao cliente</li>
                  <li>Prevenir fraudes e garantir segurança</li>
                  <li>Cumprir obrigações legais</li>
                  <li>Enviar comunicações de marketing (com seu consentimento)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  4. Armazenamento e Segurança
                </h2>
                <p className="text-muted-foreground">
                  Implementamos medidas de segurança técnicas e organizacionais
                  para proteger seus dados:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Criptografia SSL/TLS em todas as comunicações</li>
                  <li>Armazenamento em servidores seguros</li>
                  <li>Acesso restrito apenas a pessoal autorizado</li>
                  <li>Backups regulares e redundância</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Autenticação de dois fatores disponível</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Seus dados são armazenados pelo tempo necessário para cumprir
                  as finalidades descritas nesta política ou conforme exigido
                  por lei.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  5. Compartilhamento de Informações
                </h2>
                <p className="text-muted-foreground">
                  Podemos compartilhar suas informações com:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    <strong>Processadores de pagamento:</strong> Stripe, Mercado
                    Pago (apenas dados necessários)
                  </li>
                  <li>
                    <strong>Serviços de comunicação:</strong> WhatsApp API para
                    envio de mensagens
                  </li>
                  <li>
                    <strong>Provedores de infraestrutura:</strong> hospedagem e
                    armazenamento em nuvem
                  </li>
                  <li>
                    <strong>Autoridades legais:</strong> quando exigido por lei
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Nunca vendemos suas informações pessoais a terceiros.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  6. Seus Direitos (LGPD)
                </h2>
                <p className="text-muted-foreground">
                  Conforme a Lei Geral de Proteção de Dados (LGPD), você tem
                  direito a:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Confirmar a existência de tratamento de dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li>Solicitar anonimização, bloqueio ou eliminação</li>
                  <li>Obter portabilidade dos dados</li>
                  <li>
                    Revogar consentimento (quando aplicável)
                  </li>
                  <li>Opor-se a tratamento de dados</li>
                  <li>Informações sobre compartilhamento</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Para exercer seus direitos, entre em contato através do
                  e-mail:{" "}
                  <a
                    href="mailto:contato@tolivre.com.br"
                    className="text-primary hover:underline"
                  >
                    contato@tolivre.com.br
                  </a>
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  7. Cookies e Tecnologias Similares
                </h2>
                <p className="text-muted-foreground">
                  Utilizamos cookies e tecnologias similares para:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Manter você autenticado</li>
                  <li>Lembrar suas preferências</li>
                  <li>Analisar uso da plataforma</li>
                  <li>Melhorar segurança</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Você pode gerenciar cookies nas configurações do seu
                  navegador. Note que desabilitar cookies pode afetar a
                  funcionalidade da plataforma.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  8. Dados de Menores
                </h2>
                <p className="text-muted-foreground">
                  Nossa plataforma não é direcionada a menores de 18 anos. Se
                  você é pai/mãe ou responsável e acredita que seu filho
                  forneceu informações pessoais, entre em contato conosco para
                  que possamos excluir essas informações.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  9. Transferência Internacional
                </h2>
                <p className="text-muted-foreground">
                  Seus dados podem ser transferidos e processados em servidores
                  localizados fora do Brasil. Garantimos que tais transferências
                  são realizadas em conformidade com a LGPD e com medidas de
                  proteção adequadas.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  10. Alterações nesta Política
                </h2>
                <p className="text-muted-foreground">
                  Podemos atualizar esta Política de Privacidade periodicamente.
                  Notificaremos você sobre mudanças significativas por e-mail ou
                  através de aviso na plataforma. Recomendamos revisar esta
                  página regularmente.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">
                  11. Contato
                </h2>
                <p className="text-muted-foreground">
                  Para questões sobre esta Política de Privacidade ou sobre o
                  tratamento de seus dados pessoais, entre em contato:
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>
                    <strong>E-mail:</strong>{" "}
                    <a
                      href="mailto:contato@tolivre.com.br"
                      className="text-primary hover:underline"
                    >
                      contato@tolivre.com.br
                    </a>
                  </p>
                  <p>
                    <strong>Encarregado de Dados (DPO):</strong>{" "}
                    <a
                      href="mailto:dpo@tolivre.com.br"
                      className="text-primary hover:underline"
                    >
                      dpo@tolivre.com.br
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted/50 border-t border-border py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 TôLivre. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="/legal/termos"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                href="/legal/privacidade"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
