import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import { MercadoPagoConfig, Preference } from "mercadopago";
import prisma from "@/lib/prisma";

const mercadopagoClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
});

interface PlanConfig {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const plans: Record<string, PlanConfig> = {
  basic: {
    id: "basic",
    name: "Básico",
    price: 69.9,
    description: "Agendamentos ilimitados para 1 profissional",
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
    id: "professional",
    name: "Profissional",
    price: 99.9,
    description: "Agendamentos ilimitados + WhatsApp + Relatórios",
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
    id: "business",
    name: "Business",
    price: 169.9,
    description: "Profissionais ilimitados + Comissões + Suporte 24/7",
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

    // Criar preferência de pagamento no Mercado Pago
    const preference = new Preference(mercadopagoClient);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const preferenceData = await preference.create({
      body: {
        items: [
          {
            id: plan.id,
            title: `TôLivre - Plano ${plan.name}`,
            description: plan.description,
            quantity: 1,
            unit_price: plan.price,
            currency_id: "BRL",
          },
        ],
        payer: {
          email: user.email,
          name: user.name,
        },
        back_urls: {
          success: `${baseUrl}/dashboard?payment=success`,
          failure: `${baseUrl}/escolher-plano?payment=failure`,
          pending: `${baseUrl}/dashboard?payment=pending`,
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/subscription/webhook`,
        metadata: {
          user_id: user.id,
          company_id: user.companyId,
          plan_id: planId,
        },
      },
    });

    // Nota: O Payment será criado no webhook após confirmação do pagamento pelo Mercado Pago
    // Não criamos aqui para evitar registros pendentes sem subscriptionId

    return api.created({
      checkoutUrl: preferenceData.init_point,
      preferenceId: preferenceData.id,
    });
  } catch (error) {
    console.error("Erro ao criar checkout:", error);
    return api.serverError("Erro ao criar checkout de pagamento");
  }
}
