import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TermosPage() {
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

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e usar o TôLivre, você concorda em cumprir estes Termos
              de Uso. Se você não concordar com qualquer parte destes termos,
              não deve usar nosso serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Descrição do Serviço
            </h2>
            <p>
              O TôLivre é uma plataforma de gestão de agendamentos online para
              profissionais de beleza e bem-estar. Oferecemos ferramentas para
              agendamento, gestão de clientes, controle financeiro e integração
              com WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Conta de Usuário
            </h2>
            <p>Para usar nosso serviço, você deve:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Fornecer informações precisas e completas durante o registro
              </li>
              <li>Manter a segurança de sua senha</li>
              <li>
                Notificar-nos imediatamente sobre qualquer uso não autorizado de
                sua conta
              </li>
              <li>
                Ser responsável por todas as atividades que ocorrem em sua conta
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Planos e Pagamentos
            </h2>
            <p>
              Oferecemos diferentes planos de assinatura com recursos variados.
              Os preços estão disponíveis em nossa página de preços e podem ser
              alterados mediante aviso prévio.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Teste grátis de 7 dias disponível para novos usuários</li>
              <li>Cobrança mensal ou anual conforme o plano escolhido</li>
              <li>Cancelamento pode ser feito a qualquer momento</li>
              <li>Reembolsos seguem nossa política de 30 dias de garantia</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Uso Aceitável
            </h2>
            <p>Você concorda em não:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Usar o serviço para fins ilegais ou não autorizados</li>
              <li>Tentar obter acesso não autorizado ao sistema</li>
              <li>Interferir ou interromper o serviço</li>
              <li>Copiar, modificar ou distribuir o conteúdo sem permissão</li>
              <li>Usar o serviço para enviar spam ou conteúdo malicioso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo, recursos e funcionalidades do TôLivre são
              propriedade exclusiva da empresa e estão protegidos por leis de
              propriedade intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Limitação de Responsabilidade
            </h2>
            <p>
              O TôLivre é fornecido "como está" e não garantimos que o serviço
              será ininterrupto ou livre de erros. Não nos responsabilizamos por
              danos indiretos, incidentais ou consequenciais decorrentes do uso
              do serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Modificações dos Termos
            </h2>
            <p>
              Reservamos o direito de modificar estes termos a qualquer momento.
              Notificaremos os usuários sobre mudanças significativas por email
              ou através do painel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              9. Cancelamento e Encerramento
            </h2>
            <p>
              Você pode cancelar sua conta a qualquer momento através do painel.
              Podemos encerrar ou suspender sua conta se você violar estes
              termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              10. Contato
            </h2>
            <p>
              Para questões sobre estes Termos de Uso, entre em contato conosco
              em{" "}
              <a
                href="mailto:contato@tolivre.com"
                className="text-primary hover:underline"
              >
                contato@tolivre.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link href="/">
            <Button variant="outline">Voltar ao início</Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-8 mt-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TôLivre. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="/legal/privacidade"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/contato"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
