import prisma from "@/lib/prisma";
import { ContractType } from "@/generated/prisma";

/**
 * Verifica se a empresa pode adicionar mais profissionais com base no plano atual
 */
export async function checkProfessionalLimit(
  companyId: string
): Promise<{ allowed: boolean; current: number; limit: number }> {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { contrato: true },
  });

  if (!company) {
    return { allowed: false, current: 0, limit: 0 };
  }

  // Contar profissionais ativos (role EMPLOYEE ou MANAGER)
  const professionalCount = await prisma.user.count({
    where: {
      companyId,
      role: { in: ["EMPLOYEE", "MANAGER"] },
    },
  });

  // Definir limites por plano
  const limits: Record<ContractType, number> = {
    TRIAL: -1, // ilimitado durante trial
    BASIC: 1,
    PROFESSIONAL: 3,
    PRO_PLUS: 10,
    BUSINESS: -1, // ilimitado
  };

  const limit = limits[company.contrato];

  // -1 significa ilimitado
  if (limit === -1) {
    return { allowed: true, current: professionalCount, limit: -1 };
  }

  return {
    allowed: professionalCount < limit,
    current: professionalCount,
    limit,
  };
}

/**
 * Verifica se a empresa tem acesso a uma feature específica com base no plano
 */
export async function checkFeatureAccess(
  companyId: string,
  feature: string
): Promise<{ allowed: boolean; planRequired: string }> {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { contrato: true },
  });

  if (!company) {
    return { allowed: false, planRequired: "PROFESSIONAL" };
  }

  // Definir features por plano
  const planFeatures: Record<
    ContractType,
    {
      whatsapp: boolean;
      publicPage: boolean;
      reports: boolean;
      commissions: boolean;
      professionalPhotos: boolean;
      workingHourExceptions: boolean;
      websocket: boolean;
    }
  > = {
    TRIAL: {
      whatsapp: true,
      publicPage: true,
      reports: true,
      commissions: true,
      professionalPhotos: true,
      workingHourExceptions: true,
      websocket: true,
    },
    BASIC: {
      whatsapp: false,
      publicPage: false,
      reports: false,
      commissions: false,
      professionalPhotos: false,
      workingHourExceptions: false,
      websocket: false,
    },
    PROFESSIONAL: {
      whatsapp: true,
      publicPage: true,
      reports: true,
      commissions: false,
      professionalPhotos: false,
      workingHourExceptions: false,
      websocket: false,
    },
    PRO_PLUS: {
      whatsapp: true,
      publicPage: true,
      reports: true,
      commissions: true,
      professionalPhotos: true,
      workingHourExceptions: true,
      websocket: false,
    },
    BUSINESS: {
      whatsapp: true,
      publicPage: true,
      reports: true,
      commissions: true,
      professionalPhotos: true,
      workingHourExceptions: true,
      websocket: true,
    },
  };

  const currentPlanFeatures = planFeatures[company.contrato];
  const hasFeature = currentPlanFeatures[feature as keyof typeof currentPlanFeatures];

  // Determinar qual plano mínimo é necessário
  let planRequired = "PROFESSIONAL";
  if (feature === "commissions" || feature === "professionalPhotos" || feature === "workingHourExceptions") {
    planRequired = "PRO_PLUS";
  }
  if (feature === "websocket") {
    planRequired = "BUSINESS";
  }

  return {
    allowed: hasFeature ?? false,
    planRequired,
  };
}
