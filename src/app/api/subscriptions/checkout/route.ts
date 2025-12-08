import { NextRequest } from "next/server";
import { z } from "zod";
import { preferenceClient } from "@/lib/mercadopago";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

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

    // Verificar se já tem assinatura ativa
    const existingSubscription = await prisma.subscription.findUnique({
      where: { companyId: user.companyId },
    });

    if (
      existingSubscription &&
      existingSubscription.status === "ACTIVE" &&
      existingSubscription.plan !== "TRIAL"
    ) {
      return api.badRequest("Você já possui uma assinatura ativa");
    }

    const company = await prisma.company.findUnique({
      where: { id: user.companyId },
      select: { nomeFantasia: true, email: true },
    });

    if (!company) {
      return api.badRequest("Empresa não encontrada");
    }

    // Validar URL base e remover barra final se existir
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    baseUrl = baseUrl.replace(/\/+$/, ""); // Remove todas as barras do final

    if (!baseUrl) {
      console.error("[Checkout] NEXT_PUBLIC_APP_URL não configurado");
      return api.serverError("Configuração de URL inválida");
    }

    const backUrls = {
      success: `${baseUrl}/dashboard/assinatura/success`,
      failure: `${baseUrl}/dashboard/assinatura/failure`,
      pending: `${baseUrl}/dashboard/assinatura/pending`,
    };

    console.log("[Checkout] Base URL:", baseUrl);
    console.log("[Checkout] Back URLs:", backUrls);

    // Criar preferência de pagamento no Mercado Pago
    // Mercado Pago não aceita localhost em back_urls e notification_url
    const isLocalhost =
      baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const preferenceBody: any = {
      items: [
        {
          id: plan.id,
          title: `ToLivre - Plano ${plan.name}`,
          description: `Assinatura mensal do plano ${plan.name}`,
          quantity: 1,
          unit_price: plan.price,
          currency_id: "BRL",
        },
      ],
      payer: {
        email: company.email || user.email,
        name: company.nomeFantasia,
      },
      external_reference: user.companyId,
      metadata: {
        company_id: user.companyId,
        plan: parsed.plan,
      },
    };

    // Apenas adicionar back_urls e notification_url em produção
    if (!isLocalhost) {
      preferenceBody.back_urls = backUrls;
      preferenceBody.auto_return = "approved";
      preferenceBody.notification_url = `${baseUrl}/api/webhooks/mercadopago`;
    }

    console.log(
      "[Checkout] Creating preference with:",
      JSON.stringify(preferenceBody, null, 2)
    );

    const preference = await preferenceClient.create({
      body: preferenceBody,
    });

    return api.ok({
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[POST /api/subscriptions/checkout] Error:", err);
    return api.serverError("Erro ao criar checkout");
  }
}
