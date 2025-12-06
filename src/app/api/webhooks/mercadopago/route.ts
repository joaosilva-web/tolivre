import { NextRequest } from "next/server";
import { paymentClient } from "@/lib/mercadopago";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

// POST - Webhook do Mercado Pago
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(
      "[Mercado Pago Webhook] Received:",
      JSON.stringify(body, null, 2)
    );

    // Tipos de notificação: payment, merchant_order
    if (body.type !== "payment") {
      console.log(
        "[Mercado Pago Webhook] Ignoring non-payment notification:",
        body.type
      );
      return api.ok({ received: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return api.badRequest("Payment ID não fornecido");
    }

    // Buscar detalhes do pagamento no Mercado Pago
    console.log(
      "[Mercado Pago Webhook] Fetching payment details for ID:",
      paymentId
    );
    const payment = await paymentClient.get({ id: paymentId });

    if (!payment) {
      console.error("[Mercado Pago Webhook] Payment not found:", paymentId);
      return api.badRequest("Pagamento não encontrado");
    }

    console.log(
      "[Mercado Pago Webhook] Payment details:",
      JSON.stringify(payment, null, 2)
    );

    const companyId = payment.external_reference;
    const planName = payment.metadata?.plan;

    if (!companyId || !planName) {
      console.error("[Webhook] Missing company_id or plan in metadata", {
        companyId,
        planName,
        external_reference: payment.external_reference,
        metadata: payment.metadata,
      });
      return api.badRequest("Dados incompletos");
    }

    // Processar baseado no status do pagamento
    if (payment.status === "approved") {
      // Pagamento aprovado - ativar assinatura
      const currentPeriodEnd = new Date();
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

      // Upsert da assinatura
      const subscription = await prisma.subscription.upsert({
        where: { companyId },
        create: {
          companyId,
          plan: planName as any,
          status: "ACTIVE",
          mpSubscriptionId: payment.id?.toString(),
          currentPeriodStart: new Date(),
          currentPeriodEnd,
        },
        update: {
          plan: planName as any,
          status: "ACTIVE",
          mpSubscriptionId: payment.id?.toString(),
          currentPeriodStart: new Date(),
          currentPeriodEnd,
          cancelAtPeriodEnd: false,
          canceledAt: null,
        },
      });

      // Registrar pagamento
      await prisma.payment.create({
        data: {
          subscriptionId: subscription.id,
          mpPaymentId: payment.id?.toString() || "",
          amount: payment.transaction_amount || 0,
          currency: payment.currency_id || "BRL",
          status: "APPROVED",
          paymentMethod: payment.payment_method_id || null,
          paidAt: new Date(),
        },
      });

      // Atualizar contrato na company (para compatibilidade)
      await prisma.company.update({
        where: { id: companyId },
        data: {
          contrato:
            planName === "PROFESSIONAL"
              ? "PRO"
              : planName === "ENTERPRISE"
              ? "ENTERPRISE"
              : "FREE",
        },
      });

      console.log(`[Webhook] Subscription activated for company ${companyId}`);
    } else if (
      payment.status === "rejected" ||
      payment.status === "cancelled"
    ) {
      // Pagamento rejeitado/cancelado
      await prisma.subscription.updateMany({
        where: {
          companyId,
          mpSubscriptionId: payment.id?.toString(),
        },
        data: {
          status: "CANCELED",
          canceledAt: new Date(),
        },
      });

      console.log(
        `[Webhook] Payment ${payment.status} for company ${companyId}`
      );
    } else if (
      payment.status === "pending" ||
      payment.status === "in_process"
    ) {
      // Pagamento pendente
      console.log(`[Webhook] Payment pending for company ${companyId}`);
    }

    return api.ok({ received: true });
  } catch (err) {
    console.error("[POST /api/webhooks/mercadopago] Error:", err);
    return api.serverError("Erro ao processar webhook");
  }
}
