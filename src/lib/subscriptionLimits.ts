import { Subscription } from "@/generated/prisma";

export const PLANS = {
  TRIAL: {
    name: "TRIAL",
    displayName: "Trial",
    price: 0,
    features: {
      appointments: "unlimited",
      professionals: "unlimited",
      services: "unlimited",
      clients: "unlimited",
      whatsapp: true,
      support: "email",
    },
    description: "14 dias de teste grátis",
    popular: false,
  },
  BASIC: {
    name: "BASIC",
    displayName: "Básico",
    price: 29.9,
    features: {
      appointments: "unlimited",
      professionals: 1,
      services: "unlimited",
      clients: "unlimited",
      whatsapp: true,
      publicPage: true,
      support: "email",
    },
    description: "Ideal para profissionais autônomos",
    popular: false,
  },
  PROFESSIONAL: {
    name: "PROFESSIONAL",
    displayName: "Profissional",
    price: 59.9,
    features: {
      appointments: "unlimited",
      professionals: 5,
      services: "unlimited",
      clients: "unlimited",
      whatsapp: true,
      publicPage: true,
      reports: true,
      support: "priority",
    },
    description: "Para pequenas equipes",
    popular: false,
  },
  PRO_PLUS: {
    name: "PRO_PLUS",
    displayName: "Pro Plus",
    price: 99.9,
    features: {
      appointments: "unlimited",
      professionals: 15,
      services: "unlimited",
      clients: "unlimited",
      whatsapp: true,
      support: "priority",
      commissions: true,
      professionalPhotos: true,
      workingHourExceptions: true,
      publicPage: true,
      reports: true,
    },
    description: "Melhor custo-benefício para equipes em crescimento",
    popular: true,
  },
  BUSINESS: {
    name: "BUSINESS",
    displayName: "Business",
    price: 149.9,
    features: {
      appointments: "unlimited",
      professionals: "unlimited",
      services: "unlimited",
      clients: "unlimited",
      whatsapp: true,
      support: "24/7",
    },
    description: "Para grandes operações",
    popular: false,
  },
} as const;

export type PlanName = keyof typeof PLANS;

export function checkAppointmentLimit(
  subscription: Subscription | null,
  currentCount: number,
): { allowed: boolean; message?: string } {
  if (!subscription || subscription.status !== "ACTIVE") {
    const limit = PLANS.TRIAL.features.appointments;
    // Trial tem appointments ilimitados
    if (limit !== "unlimited" && currentCount >= limit) {
      return {
        allowed: false,
        message: `Limite de ${limit} agendamentos/mês atingido no plano gratuito. Faça upgrade para continuar.`,
      };
    }
  } else {
    const planName = subscription.plan as PlanName;
    const limit = PLANS[planName].features.appointments;
    if (limit !== "unlimited" && currentCount >= limit) {
      return {
        allowed: false,
        message: `Limite de ${limit} agendamentos/mês atingido. Faça upgrade do plano.`,
      };
    }
  }
  return { allowed: true };
}
