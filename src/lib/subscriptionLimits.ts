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
    price: 69.9,
    features: {
      appointments: "unlimited",
      professionals: 1,
      services: "unlimited",
      clients: "unlimited",
      whatsapp: false,
      support: "email",
    },
    description: "Ideal para profissionais autônomos",
    popular: false,
  },
  PROFESSIONAL: {
    name: "PROFESSIONAL",
    displayName: "Profissional",
    price: 99.9,
    features: {
      appointments: "unlimited",
      professionals: 3,
      services: "unlimited",
      clients: "unlimited",
      whatsapp: true,
      support: "priority",
    },
    description: "Para pequenas equipes",
    popular: true,
  },
  BUSINESS: {
    name: "BUSINESS",
    displayName: "Business",
    price: 169.9,
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

export function getPlanLimits(plan: PlanName) {
  return PLANS[plan].features;
}

export function checkAppointmentLimit(
  subscription: Subscription | null,
  currentCount: number
): { allowed: boolean; message?: string } {
  if (!subscription || subscription.status !== "ACTIVE") {
    const limit = PLANS.TRIAL.features.appointments;
    if (currentCount >= limit) {
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

export function checkProfessionalLimit(
  subscription: Subscription | null,
  currentCount: number
): { allowed: boolean; message?: string } {
  if (!subscription || subscription.status !== "ACTIVE") {
    const limit = PLANS.TRIAL.features.professionals;
    if (currentCount >= limit) {
      return {
        allowed: false,
        message: `Limite de ${limit} profissional atingido no plano gratuito. Faça upgrade para adicionar mais.`,
      };
    }
  } else {
    const planName = subscription.plan as PlanName;
    const limit = PLANS[planName].features.professionals;
    if (limit !== "unlimited" && currentCount >= limit) {
      return {
        allowed: false,
        message: `Limite de ${limit} profissionais atingido. Faça upgrade do plano.`,
      };
    }
  }
  return { allowed: true };
}

export function getCurrentPlan(subscription: Subscription | null): PlanName {
  if (!subscription || subscription.status !== "ACTIVE") {
    return "FREE";
  }
  return subscription.plan as PlanName;
}
