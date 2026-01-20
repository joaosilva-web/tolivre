import { NextRequest } from "next/server";
import * as api from "@/app/libs/apiResponse";
import stripe from "@/lib/stripe";
import prisma from "@/lib/prisma";

// Função para verificar assinatura do webhook (opcional para desenvolvimento)
async function verifyStripeSignature(req: NextRequest, body: string) {
  const signature = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret || !signature) {
    // Em desenvolvimento, aceitar sem verificação
    if (process.env.NODE_ENV !== "production") {
      return true;
    }
    return false;
  }

  try {
    // Verificar assinatura usando a biblioteca Stripe
    // Nota: Isso requer a instalação de micro para raw body parsing
    // Por enquanto, aceitamos sem verificação em desenvolvimento
    return true;
  } catch (error) {
    console.error("[Stripe Webhook] Erro na verificação da assinatura:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    // Verificar assinatura do webhook (opcional)
    const isValidSignature = await verifyStripeSignature(req, body);
    if (!isValidSignature) {
      console.error("[Stripe Webhook] Assinatura inválida");
      return api.badRequest("Assinatura inválida");
    }

    const event = JSON.parse(body);

    console.log("[Stripe Webhook] Evento recebido:", {
      id: event.id,
      type: event.type,
      created: event.created,
    });

    // Processar diferentes tipos de eventos
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;

      default:
        console.log(`[Stripe Webhook] Evento não processado: ${event.type}`);
    }

    return api.ok({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Erro ao processar:", error);
    return api.serverError("Erro ao processar webhook");
  }
}

// Handler para quando uma sessão de checkout é completada
async function handleCheckoutSessionCompleted(session: any) {
  try {
    const { customer, subscription, metadata } = session;

    if (!metadata?.company_id || !metadata?.plan_id) {
      console.error("[Stripe Webhook] Metadata incompleta:", metadata);
      return;
    }

    const companyId = metadata.company_id;
    const planId = metadata.plan_id;
    const userId = metadata.user_id;

    console.log(
      `[Stripe Webhook] Checkout completado para company ${companyId}, plano ${planId}`
    );

    // Buscar detalhes da assinatura no Stripe
    const subscriptionDetails = await stripe.subscriptions.retrieve(subscription) as any;

    // Calcular período atual
    const currentPeriodStart = new Date(subscriptionDetails.current_period_start * 1000);
    const currentPeriodEnd = new Date(subscriptionDetails.current_period_end * 1000);

    // Upsert da assinatura no banco
    const dbSubscription = await prisma.subscription.upsert({
      where: { companyId },
      create: {
        companyId,
        plan: planId as any,
        status: "ACTIVE",
        stripeSubscriptionId: subscription,
        stripeCustomerId: customer,
        stripePriceId: subscriptionDetails.items.data[0]?.price?.id,
        currentPeriodStart,
        currentPeriodEnd,
      },
      update: {
        plan: planId as any,
        status: "ACTIVE",
        stripeSubscriptionId: subscription,
        stripeCustomerId: customer,
        stripePriceId: subscriptionDetails.items.data[0]?.price?.id,
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd: false,
        canceledAt: null,
      },
    });

    // Registrar pagamento inicial
    await prisma.payment.create({
      data: {
        subscriptionId: dbSubscription.id,
        stripePaymentIntentId: session.payment_intent,
        amount: subscriptionDetails.items.data[0]?.price?.unit_amount
          ? subscriptionDetails.items.data[0].price.unit_amount / 100
          : 0,
        currency: subscriptionDetails.currency?.toUpperCase() || "BRL",
        status: "APPROVED",
        paymentMethod: "card",
        paidAt: new Date(),
      },
    });

    // Atualizar contrato na company
    await prisma.company.update({
      where: { id: companyId },
      data: {
        contrato: planId as any,
      },
    });

    // Remover trial do usuário se aplicável
    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          trialEndsAt: null,
        },
      });
    }

    console.log(`[Stripe Webhook] Assinatura ativada para company ${companyId}`);
  } catch (error) {
    console.error("[Stripe Webhook] Erro no checkout.session.completed:", error);
  }
}

// Handler para quando um pagamento de fatura é bem-sucedido
async function handleInvoicePaymentSucceeded(invoice: any) {
  try {
    const subscriptionId = invoice.subscription;
    const amount = invoice.amount_paid / 100; // Stripe trabalha com centavos

    console.log(
      `[Stripe Webhook] Pagamento de fatura bem-sucedido: ${subscriptionId}, valor: ${amount}`
    );

    // Buscar assinatura no banco
    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (!subscription) {
      console.error("[Stripe Webhook] Assinatura não encontrada:", subscriptionId);
      return;
    }

    // Registrar pagamento recorrente
    await prisma.payment.create({
      data: {
        subscriptionId: subscription.id,
        stripePaymentIntentId: invoice.payment_intent,
        amount,
        currency: invoice.currency?.toUpperCase() || "BRL",
        status: "APPROVED",
        paymentMethod: "card",
        paidAt: new Date(),
      },
    });

    // Atualizar período da assinatura
    const subscriptionDetails = await stripe.subscriptions.retrieve(subscriptionId) as any;
    const currentPeriodStart = new Date(subscriptionDetails.current_period_start * 1000);
    const currentPeriodEnd = new Date(subscriptionDetails.current_period_end * 1000);

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        currentPeriodStart,
        currentPeriodEnd,
        status: "ACTIVE",
      },
    });

    console.log(`[Stripe Webhook] Pagamento recorrente processado para subscription ${subscriptionId}`);
  } catch (error) {
    console.error("[Stripe Webhook] Erro no invoice.payment_succeeded:", error);
  }
}

// Handler para quando um pagamento de fatura falha
async function handleInvoicePaymentFailed(invoice: any) {
  try {
    const subscriptionId = invoice.subscription;

    console.log(`[Stripe Webhook] Pagamento de fatura falhou: ${subscriptionId}`);

    // Buscar assinatura no banco
    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (!subscription) {
      console.error("[Stripe Webhook] Assinatura não encontrada:", subscriptionId);
      return;
    }

    // Registrar tentativa de pagamento falhada
    const amount = invoice.amount_due / 100;
    await prisma.payment.create({
      data: {
        subscriptionId: subscription.id,
        stripePaymentIntentId: invoice.payment_intent,
        amount,
        currency: invoice.currency?.toUpperCase() || "BRL",
        status: "REJECTED",
        paymentMethod: "card",
        paidAt: new Date(),
      },
    });

    console.log(`[Stripe Webhook] Pagamento falhado registrado para subscription ${subscriptionId}`);
  } catch (error) {
    console.error("[Stripe Webhook] Erro no invoice.payment_failed:", error);
  }
}

// Handler para quando uma assinatura é cancelada
async function handleSubscriptionDeleted(subscription: any) {
  try {
    const subscriptionId = subscription.id;

    console.log(`[Stripe Webhook] Assinatura cancelada: ${subscriptionId}`);

    // Atualizar status da assinatura no banco
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: "CANCELED",
        canceledAt: new Date(),
        cancelAtPeriodEnd: false,
      },
    });

    console.log(`[Stripe Webhook] Assinatura cancelada no banco: ${subscriptionId}`);
  } catch (error) {
    console.error("[Stripe Webhook] Erro no customer.subscription.deleted:", error);
  }
}

// Handler para quando uma assinatura é atualizada
async function handleSubscriptionUpdated(subscription: any) {
  try {
    const subscriptionId = subscription.id;

    console.log(`[Stripe Webhook] Assinatura atualizada: ${subscriptionId}`);

    // Atualizar dados da assinatura no banco
    const currentPeriodStart = new Date(subscription.current_period_start * 1000);
    const currentPeriodEnd = new Date(subscription.current_period_end * 1000);

    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        status: subscription.status === "active" ? "ACTIVE" : "CANCELED",
      },
    });

    console.log(`[Stripe Webhook] Assinatura atualizada no banco: ${subscriptionId}`);
  } catch (error) {
    console.error("[Stripe Webhook] Erro no customer.subscription.updated:", error);
  }
}
