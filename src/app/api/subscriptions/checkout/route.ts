import { NextRequest } from "next/server";
import { z } from "zod";
import { createOrRetrieveProduct, createOrRetrievePrice, createCheckoutSession } from "@/lib/stripe";
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

    // URLs de sucesso e cancelamento
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/escolher-plano?payment=cancelled`;

    console.log("[Stripe Checkout] Base URL:", baseUrl);
    console.log("[Stripe Checkout] Success URL:", successUrl);
    console.log("[Stripe Checkout] Cancel URL:", cancelUrl);

    // Criar produto no Stripe (se não existir)
    const product = await createOrRetrieveProduct(
      plan.id.toLowerCase(),
      plan.name,
      `Assinatura mensal do plano ${plan.name}`
    );

    // Criar preço no Stripe (se não existir)
    const price = await createOrRetrievePrice(
      product.id,
      plan.price,
      "brl",
      `Plano ${plan.name} - Mensal`
    );

    // Criar sessão de checkout no Stripe
    const session = await createCheckoutSession({
      priceId: price.id,
      customerEmail: company.email || user.email,
      customerName: company.nomeFantasia || user.name,
      successUrl,
      cancelUrl,
      metadata: {
        company_id: user.companyId,
        plan: parsed.plan,
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
