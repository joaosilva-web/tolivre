import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return api.badRequest("session_id ausente");
  }

  try {
    // Recupera a sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (
      !session?.metadata?.company_id ||
      !session.subscription ||
      !session.customer
    ) {
      console.error(
        "[stripe-success] Metadata incompleta ou sem subscription",
        {
          sessionId,
          metadata: session?.metadata,
          subscription: session?.subscription,
        },
      );
      return api.badRequest("Dados insuficientes para processar assinatura");
    }

    const companyId = session.metadata.company_id;
    const planId = session.metadata.plan_id;
    const userId = session.metadata.user_id;

    // Busca detalhes da assinatura no Stripe
    const subscriptionDetails = (await stripe.subscriptions.retrieve(
      session.subscription as string,
    )) as any;

    const currentPeriodStart = new Date(
      subscriptionDetails.current_period_start * 1000,
    );
    const currentPeriodEnd = new Date(
      subscriptionDetails.current_period_end * 1000,
    );
    const stripePriceId = subscriptionDetails.items.data[0]?.price?.id;
    const stripeUnitAmount =
      subscriptionDetails.items.data[0]?.price?.unit_amount || 0;

    // Upsert da assinatura
    const dbSubscription = await prisma.subscription.upsert({
      where: { companyId },
      create: {
        companyId,
        plan: planId as any,
        status: "ACTIVE",
        stripeSubscriptionId: subscriptionDetails.id,
        stripeCustomerId: session.customer as string,
        stripePriceId,
        currentPeriodStart,
        currentPeriodEnd,
      },
      update: {
        plan: planId as any,
        status: "ACTIVE",
        stripeSubscriptionId: subscriptionDetails.id,
        stripeCustomerId: session.customer as string,
        stripePriceId,
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd: false,
        canceledAt: null,
      },
    });

    // Registrar pagamento se ainda não existir
    if (session.payment_intent) {
      const paymentIntentId = session.payment_intent as string;
      const existingPayment = await prisma.payment.findFirst({
        where: { stripePaymentIntentId: paymentIntentId },
        select: { id: true },
      });

      if (!existingPayment) {
        await prisma.payment.create({
          data: {
            subscriptionId: dbSubscription.id,
            stripePaymentIntentId: paymentIntentId,
            amount: stripeUnitAmount ? stripeUnitAmount / 100 : 0,
            currency: subscriptionDetails.currency?.toUpperCase() || "BRL",
            status: "APPROVED",
            paymentMethod: "card",
            paidAt: new Date(),
          },
        });
      }
    }

    // Atualizar contrato da empresa
    await prisma.company.update({
      where: { id: companyId },
      data: { contrato: planId as any },
    });

    // Remover trial do usuário se informado
    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { trialEndsAt: null },
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/dashboard?payment=confirmed`, {
      status: 302,
    });
  } catch (error) {
    console.error(
      "[stripe-success] Erro ao processar retorno de checkout:",
      error,
    );
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/escolher-plano?payment=error`, {
      status: 302,
    });
  }
}
