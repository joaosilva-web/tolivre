import { NextRequest } from "next/server";
import * as api from "@/app/libs/apiResponse";
import { MercadoPagoConfig, Payment } from "mercadopago";
import prisma from "@/lib/prisma";

const mercadopagoClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("[Mercado Pago Webhook] Notificação recebida:", body);

    // Mercado Pago envia notificações de diferentes tipos
    const { type, data } = body;

    // Processar apenas notificações de pagamento
    if (type !== "payment") {
      console.log("[Mercado Pago Webhook] Tipo ignorado:", type);
      return api.ok({ message: "Notificação ignorada" });
    }

    // Buscar detalhes do pagamento
    const paymentId = data.id;
    const paymentClient = new Payment(mercadopagoClient);
    const payment = await paymentClient.get({ id: paymentId });

    console.log("[Mercado Pago Webhook] Pagamento:", {
      id: payment.id,
      status: payment.status,
      metadata: payment.metadata,
    });

    // Extrair metadata
    const userId = payment.metadata?.user_id as string;
    const companyId = payment.metadata?.company_id as string;
    const planId = payment.metadata?.plan_id as string;

    if (!userId || !companyId || !planId) {
      console.error(
        "[Mercado Pago Webhook] Metadata incompleta:",
        payment.metadata
      );
      return api.badRequest("Metadata incompleta");
    }

    // Se o pagamento foi aprovado, ativar assinatura
    if (payment.status === "approved") {
      console.log(
        `[Mercado Pago Webhook] Pagamento aprovado para company ${companyId}`
      );

      // Mapear planId para ContractType
      const contractTypeMap: Record<string, string> = {
        basic: "BASIC",
        professional: "PROFESSIONAL",
        business: "BUSINESS",
      };

      const contractType = contractTypeMap[planId] || "TRIAL";

      // Atualizar company com novo contrato
      await prisma.company.update({
        where: { id: companyId },
        data: {
          contrato: contractType as any,
        },
      });

      // Criar ou atualizar assinatura
      await prisma.subscription.upsert({
        where: { companyId },
        create: {
          companyId,
          plan: contractType as any,
          status: "ACTIVE",
          currentPeriodStart: new Date(),
        },
        update: {
          plan: contractType as any,
          status: "ACTIVE",
          currentPeriodStart: new Date(),
        },
      });

      // Remover trial do usuário (setar como null = converteu)
      await prisma.user.update({
        where: { id: userId },
        data: {
          trialEndsAt: null,
        },
      });

      // TODO: Criar registro de Payment quando implementarmos o histórico completo de pagamentos
      // Por enquanto, apenas atualizamos Company e Subscription

      console.log(
        `[Mercado Pago Webhook] Assinatura ativada: ${contractType} para company ${companyId}`
      );
    } else if (payment.status === "rejected") {
      console.log(
        `[Mercado Pago Webhook] Pagamento rejeitado para company ${companyId}`
      );

      // TODO: Registrar falha no Payment quando implementarmos histórico completo
      // Por enquanto, apenas logamos
    }

    return api.ok({ message: "Webhook processado com sucesso" });
  } catch (error) {
    console.error("[Mercado Pago Webhook] Erro ao processar:", error);
    return api.serverError("Erro ao processar webhook");
  }
}
