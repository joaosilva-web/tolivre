import { Subscription } from "@/generated/prisma";

export const PLANS = {
  FREE: {
    name: "FREE",
    displayName: "Gratuito",
    price: 0,
    features: {
      appointments: 50,
      professionals: 1,
      services: "unlimited",
      clients: "unlimited",
      whatsapp: true,
      support: "email",
    },
    description: "Ideal para começar",
    popular: false,
  },
  PROFESSIONAL: {
    name: "PROFESSIONAL",
    displayName: "Profissional",
    price: 49,
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
  ENTERPRISE: {
    name: "ENTERPRISE",
    displayName: "Enterprise",
    price: 149,
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
    const limit = PLANS.FREE.features.appointments;
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
    const limit = PLANS.FREE.features.professionals;
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
