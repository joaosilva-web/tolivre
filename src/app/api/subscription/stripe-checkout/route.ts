import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import stripe, {
  createOrRetrieveProduct,
  createOrRetrievePrice,
  createCheckoutSession,
} from "@/lib/stripe";
import prisma from "@/lib/prisma";

interface PlanConfig {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  stripeProductId: string;
}

const plans: Record<string, PlanConfig> = {
  basic: {
    id: "BASIC",
    name: "Básico",
    price: 69.9,
    description: "Agendamentos ilimitados para 1 profissional",
    stripeProductId: "tolivre-basic",
    features: [
      "Agendamentos ilimitados",
      "1 profissional",
      "Gestão de clientes",
      "Gestão de serviços",
      "Calendário semanal",
      "Suporte por email",
    ],
  },
  professional: {
    id: "PROFESSIONAL",
    name: "Profissional",
    price: 99.9,
    description: "Agendamentos ilimitados + WhatsApp + Relatórios",
    stripeProductId: "tolivre-professional",
    features: [
      "Tudo do Básico +",
      "Até 3 profissionais",
      "Integração WhatsApp",
      "Lembretes automáticos",
      "Relatórios e estatísticas",
      "Página pública de agendamento",
    ],
  },
  business: {
    id: "BUSINESS",
    name: "Business",
    price: 169.9,
    description: "Profissionais ilimitados + Comissões + Suporte 24/7",
    stripeProductId: "tolivre-business",
    features: [
      "Tudo do Profissional +",
      "Profissionais ilimitados",
      "Sistema de comissões",
      "Fotos dos profissionais",
      "Notificações em tempo real",
      "Suporte 24/7",
    ],
  },
};

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const body = await req.json();
    const { planId } = body as { planId: string };

    const plan = plans[planId];
    if (!plan) {
      return api.badRequest("Plano inválido");
    }

    // Verificar se usuário tem company
    if (!user.companyId) {
      return api.badRequest("Usuário sem empresa associada");
    }

    // Verificar se já tem assinatura (para upgrade/downgrade via update do Stripe)
    const existingSubscription = await prisma.subscription.findUnique({
      where: { companyId: user.companyId },
    });

    // Obter dados da empresa
    const company = await prisma.company.findUnique({
      where: { id: user.companyId },
      select: { nomeFantasia: true, email: true },
    });

    if (!company) {
      return api.badRequest("Empresa não encontrada");
    }

    // Criar ou buscar produto e preço no Stripe
    const product = await createOrRetrieveProduct(
      plan.stripeProductId,
      plan.name,
      plan.description,
    );

    const price = await createOrRetrievePrice(
      product.id,
      plan.price,
      "brl",
      `Plano ${plan.name} - Mensal`,
    );

    // Se já existe assinatura ativa com Stripe, faz update do price (sem novo checkout)
    if (
      existingSubscription?.status === "ACTIVE" &&
      existingSubscription?.stripeSubscriptionId
    ) {
      const stripeSub = await stripe.subscriptions.retrieve(
        existingSubscription.stripeSubscriptionId,
      );

      const firstItem = stripeSub.items.data[0];

      const updatedSub = await stripe.subscriptions.update(
        existingSubscription.stripeSubscriptionId,
        {
          items: [
            {
              id: firstItem.id,
              price: price.id,
            },
          ],
          proration_behavior: "create_prorations",
        },
      );

      const currentPeriodStart = new Date(
        updatedSub.current_period_start * 1000,
      );
      const currentPeriodEnd = new Date(updatedSub.current_period_end * 1000);

      await prisma.subscription.update({
        where: { companyId: user.companyId },
        data: {
          plan: plan.id as any,
          status: "ACTIVE",
          stripePriceId: price.id,
          currentPeriodStart,
          currentPeriodEnd,
          cancelAtPeriodEnd: false,
          canceledAt: null,
        },
      });

      await prisma.company.update({
        where: { id: user.companyId },
        data: { contrato: plan.id as any },
      });

      // Cobrar pró-rata imediatamente para evitar uso sem pagamento
      try {
        const invoice = await stripe.invoices.create({
          customer: stripeSub.customer as string,
          subscription: stripeSub.id,
          collection_method: "charge_automatically",
        });

        const paidInvoice = await stripe.invoices.pay(invoice.id);

        const paymentIntentId =
          typeof paidInvoice.payment_intent === "string"
            ? paidInvoice.payment_intent
            : paidInvoice.payment_intent?.id;

        if (paymentIntentId) {
          const existingPayment = await prisma.payment.findFirst({
            where: { stripePaymentIntentId: paymentIntentId },
            select: { id: true },
          });

          if (!existingPayment) {
            await prisma.payment.create({
              data: {
                subscriptionId: existingSubscription.id,
                stripePaymentIntentId: paymentIntentId,
                amount: paidInvoice.total ? paidInvoice.total / 100 : 0,
                currency: paidInvoice.currency?.toUpperCase() || "BRL",
                status: "APPROVED",
                paymentMethod: "card",
                paidAt: new Date(),
              },
            });
          }
        }
      } catch (err) {
        console.error("[Stripe] Falha ao cobrar pró-rata imediatamente:", err);
      }

      return api.ok({
        updated: true,
        currentPeriodEnd,
      });
    }

    // Caso não tenha assinatura ativa, criar checkout
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/api/subscription/stripe-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/escolher-plano?payment=cancelled`;

    const session = await createCheckoutSession({
      priceId: price.id,
      customerEmail: company.email || user.email,
      customerName: company.nomeFantasia || user.name,
      successUrl,
      cancelUrl,
      metadata: {
        user_id: user.id,
        company_id: user.companyId,
        plan_id: plan.id,
      },
    });

    return api.ok({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Erro ao criar checkout Stripe:", error);
    return api.serverError("Erro ao criar checkout de pagamento");
  }
}
