import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import prisma from "@/lib/prisma";

// Helper para verificar se é usuário interno do ToLivre
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    console.log(
      "[trial-status API] User:",
      user?.id,
      "CompanyId:",
      user?.companyId,
    );

    if (!user) {
      return api.unauthorized();
    }

    // Staff do ToLivre é isento de pagamentos
    if (isToLivreStaff(user.email)) {
      return api.ok({
        isInTrial: false,
        trialEndsAt: null,
        subscriptionStatus: "active",
        isToLivreStaff: true,
      });
    }

    if (!user.companyId) {
      return api.forbidden("Usuário não vinculado a uma empresa");
    }

    const company = await prisma.company.findUnique({
      where: { id: user.companyId },
      select: {
        trialEndsAt: true,
        subscriptionStatus: true,
      },
    });

    console.log("[trial-status API] Company data:", {
      trialEndsAt: company?.trialEndsAt,
      subscriptionStatus: company?.subscriptionStatus,
    });

    if (!company) {
      return api.notFound("Empresa não encontrada");
    }

    const now = new Date();
    const isInTrial = company.trialEndsAt ? company.trialEndsAt > now : false;

    console.log("[trial-status API] Is in trial:", isInTrial);
    console.log("[trial-status API] Now:", now);
    console.log("[trial-status API] Trial ends at:", company.trialEndsAt);

    return api.ok({
      isInTrial,
      trialEndsAt: company.trialEndsAt,
      subscriptionStatus: company.subscriptionStatus,
    });
  } catch (err) {
    console.error("[trial-status API] Error fetching trial status:", err);
    return api.serverError("Erro ao buscar status do trial");
  }
}
