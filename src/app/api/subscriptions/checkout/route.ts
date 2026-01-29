import { NextRequest } from "next/server";
import { z } from "zod";
import stripe, {
  createOrRetrieveProduct,
  createOrRetrievePrice,
  createCheckoutSession,
} from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import type Stripe from "stripe";

// Definição dos planos
export const PLANS = {
  BASIC: {
    id: "BASIC",
    name: "Básico",
    price: 69.9,
    features: [
      "Agendamentos ilimitados",
      "1 profissional",
      "Gestão de clientes",
      "Gestão de serviços",
      "Calendário semanal",
      "Suporte por email",
    ],
    limits: {
      appointments: -1,
      professionals: 1,
    },
  },
  PROFESSIONAL: {
    id: "PROFESSIONAL",
    name: "Profissional",
    price: 99.9,
    features: [
      "Tudo do Básico +",
      "Até 3 profissionais",
      "Integração WhatsApp",
      "Lembretes automáticos",
      "Relatórios e estatísticas",
      "Página de agendamento pública",
      "Suporte prioritário",
    ],
    limits: {
      appointments: -1,
      professionals: 3,
    },
  },
  BUSINESS: {
    id: "BUSINESS",
    name: "Business",
    price: 169.9,
    features: [
      "Tudo do Profissional +",
      "Profissionais ilimitados",
      "Sistema de comissões",
      "Fotos dos profissionais",
      "Notificações em tempo real",
      "Suporte prioritário 24/7",
      "Migração assistida",
    ],
    limits: {
      appointments: -1,
      professionals: -1,
    },
  },
};

const checkoutSchema = z.object({
  plan: z.enum(["BASIC", "PROFESSIONAL", "BUSINESS"]),
});

// POST - Criar preferência de pagamento
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    const body = await req.json();
    const parsed = checkoutSchema.parse(body);

    const plan = PLANS[parsed.plan];
    if (!plan) {
      return api.badRequest("Plano inválido");
    }

    // Verificar se já tem assinatura (para upgrade/downgrade via update do Stripe)
    const existingSubscription = await prisma.subscription.findUnique({
      where: { companyId: user.companyId },
    });

    const company = await prisma.company.findUnique({
      where: { id: user.companyId },
      select: { nomeFantasia: true, email: true },
    });

    if (!company) {
      return api.badRequest("Empresa não encontrada");
    }

    // URLs de sucesso e cancelamento
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/api/subscription/stripe-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/escolher-plano?payment=cancelled`;

    console.log("[Stripe Checkout] Base URL:", baseUrl);
    console.log("[Stripe Checkout] Success URL:", successUrl);
    console.log("[Stripe Checkout] Cancel URL:", cancelUrl);

    // Criar produto no Stripe (se não existir)
    const product = await createOrRetrieveProduct(
      plan.id.toLowerCase(),
      plan.name,
      `Assinatura mensal do plano ${plan.name}`,
    );

    // Criar preço no Stripe (se não existir)
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
      const stripeSub = (await stripe.subscriptions.retrieve(
        existingSubscription.stripeSubscriptionId,
      )) as Stripe.Subscription;

      const firstItem = stripeSub.items.data[0];

      const updatedSub = (await stripe.subscriptions.update(
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
      )) as Stripe.Subscription & {
        current_period_start?: number;
        current_period_end?: number;
        currentPeriodStart?: number;
        currentPeriodEnd?: number;
      };

      const currentPeriodStartUnix =
        updatedSub.current_period_start ?? updatedSub.currentPeriodStart;
      const currentPeriodEndUnix =
        updatedSub.current_period_end ?? updatedSub.currentPeriodEnd;

      const currentPeriodStart = new Date(
        (currentPeriodStartUnix ?? Date.now() / 1000) * 1000,
      );
      const currentPeriodEnd = new Date(
        (currentPeriodEndUnix ?? Date.now() / 1000) * 1000,
      );

      await prisma.subscription.update({
        where: { companyId: user.companyId },
        data: {
          plan: parsed.plan,
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
        data: { contrato: parsed.plan },
      });

      // Cobrar pró-rata imediatamente
      try {
        const invoice = await stripe.invoices.create({
          customer: stripeSub.customer as string,
          subscription: stripeSub.id,
          collection_method: "charge_automatically",
        });

        const paidInvoice = (await stripe.invoices.pay(
          invoice.id,
        )) as Stripe.Invoice & {
          payment_intent?: string | Stripe.PaymentIntent | null;
          paymentIntent?: string | Stripe.PaymentIntent | null;
        };

        const paymentIntentValue =
          paidInvoice.payment_intent ?? paidInvoice.paymentIntent;

        const paymentIntentId =
          typeof paymentIntentValue === "string"
            ? paymentIntentValue
            : paymentIntentValue?.id;

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

    // Criar sessão de checkout no Stripe
    const session = await createCheckoutSession({
      priceId: price.id,
      customerEmail: company.email || user.email,
      customerName: company.nomeFantasia || user.name,
      successUrl,
      cancelUrl,
      metadata: {
        company_id: user.companyId,
        plan_id: parsed.plan,
        user_id: user.id,
      },
    });

    return api.ok({
      sessionId: session.id,
      url: session.url,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[POST /api/subscriptions/checkout] Error:", err);
    return api.serverError("Erro ao criar checkout");
  }
}
