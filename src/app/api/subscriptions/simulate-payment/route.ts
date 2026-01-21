import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

// POST - Simular pagamento aprovado (para testes)
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    const body = await req.json();
    const { plan } = body; // BASIC, PROFESSIONAL ou BUSINESS

    if (!plan || !["BASIC", "PROFESSIONAL", "BUSINESS"].includes(plan)) {
      return api.badRequest("Plano inválido");
    }

    // Simular ativação de assinatura (Stripe)
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

    const subscription = await prisma.subscription.upsert({
      where: { companyId: user.companyId },
      create: {
        companyId: user.companyId,
        plan: plan,
        status: "ACTIVE",
        stripeSubscriptionId: `test-${Date.now()}`,
        currentPeriodStart: new Date(),
        currentPeriodEnd,
      },
      update: {
        plan: plan,
        status: "ACTIVE",
        stripeSubscriptionId: `test-${Date.now()}`,
        currentPeriodStart: new Date(),
        currentPeriodEnd,
        cancelAtPeriodEnd: false,
        canceledAt: null,
      },
    });

    // Criar registro de pagamento simulado
    await prisma.payment.create({
      data: {
        subscriptionId: subscription.id,
        stripePaymentIntentId: `test-payment-${Date.now()}`,
        amount:
          plan === "BASIC" ? 69.9 : plan === "PROFESSIONAL" ? 99.9 : 169.9,
        currency: "BRL",
        status: "APPROVED",
        paymentMethod: "credit_card",
        paidAt: new Date(),
      },
    });

    // Atualizar campo contrato na company (agora usa os mesmos nomes)
    await prisma.company.update({
      where: { id: user.companyId },
      data: {
        contrato: plan,
      },
    });

    console.log(
      `[Simulate Payment] Subscription activated for company ${user.companyId}`,
    );

    return api.ok({
      message: "Pagamento simulado com sucesso",
      subscription,
    });
  } catch (err) {
    console.error("[POST /api/subscriptions/simulate-payment] Error:", err);
    return api.serverError("Erro ao simular pagamento");
  }
}
