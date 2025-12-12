// app/api/onboarding/status/route.ts
import { NextRequest } from "next/server";
import { getUserFromCookie, JWTPayload } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

export async function GET(req: NextRequest) {
  const user: JWTPayload | null = await getUserFromCookie();
  if (!user) return api.unauthorized();

  try {
    // Se o usuário não tem companyId, precisa de onboarding
    if (!user.companyId) {
      return api.ok({
        needsOnboarding: true,
        reason: "no_company_linked",
        hasCompany: false,
      });
    }

    const company = await prisma.company.findUnique({
      where: { id: user.companyId },
      select: {
        nomeFantasia: true,
        cnpjCpf: true,
        telefone: true,
      },
    });

    if (!company) {
      return api.ok({
        needsOnboarding: true,
        reason: "company_not_found",
        hasCompany: false,
      });
    }

    // Verifica se os dados essenciais estão preenchidos
    const hasEssentialData =
      company.nomeFantasia && company.cnpjCpf && company.telefone;

    // Verifica se tem pelo menos um serviço
    const servicesCount = await prisma.service.count({
      where: { companyId: user.companyId },
    });

    // Verifica se tem pelo menos um horário de funcionamento
    const workingHoursCount = await prisma.workingHours.count({
      where: { companyId: user.companyId },
    });

    // Onboarding é necessário APENAS se faltam dados essenciais da empresa
    // Serviços e horários podem ser adicionados depois
    const needsOnboarding = !hasEssentialData;

    console.log(
      `[Onboarding Status] User: ${user.id}, Company: ${user.companyId}`
    );
    console.log(`  - hasEssentialData: ${hasEssentialData}`);
    console.log(`  - servicesCount: ${servicesCount}`);
    console.log(`  - workingHoursCount: ${workingHoursCount}`);
    console.log(`  - needsOnboarding: ${needsOnboarding}`);

    return api.ok({
      needsOnboarding,
      hasCompany: true,
      hasEssentialData,
      hasServices: servicesCount > 0,
      hasWorkingHours: workingHoursCount > 0,
      servicesCount,
      workingHoursCount,
    });
  } catch (err) {
    console.error("Erro ao verificar status do onboarding:", err);
    return api.serverError("Erro ao verificar status");
  }
}
