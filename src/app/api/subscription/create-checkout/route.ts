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
  professional: {
    id: "professional",
    name: "Professional",
    price: 49.0,
    description: "Agendamentos ilimitados + WhatsApp + Relatórios",
    features: [
      "Agendamentos ilimitados",
      "Até 3 profissionais",
      "Integração WhatsApp",
      "Lembretes automáticos",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: 149.0,
    description: "Profissionais ilimitados + API + White Label",
    features: [
      "Tudo do Professional",
      "Profissionais ilimitados",
      "API completa",
      "White label",
      "Treinamento dedicado",
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
            title: `ToLivre - Plano ${plan.name}`,
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

    // Salvar intenção de pagamento no banco (opcional, para controle)
    await prisma.payment.create({
      data: {
        companyId: user.companyId,
        amount: plan.price,
        method: "MERCADO_PAGO",
        status: "PENDING",
        metadata: {
          preference_id: preferenceData.id,
          plan_id: planId,
          plan_name: plan.name,
        },
      },
    });

    return api.created({
      checkoutUrl: preferenceData.init_point,
      preferenceId: preferenceData.id,
    });
  } catch (error) {
    console.error("Erro ao criar checkout:", error);
    return api.serverError("Erro ao criar checkout de pagamento");
  }
}
