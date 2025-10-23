// app/api/company/[id]/route.ts
import { NextRequest } from "next/server";
import { Company } from "@/generated/prisma";
import { getUserFromCookie, JWTPayload } from "@/app/libs/auth";

import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

interface CompanyParams {
  id: string;
}

export async function GET(req: NextRequest, context: unknown) {
  const { params } = (context as { params: CompanyParams } | undefined) ?? {
    params: {} as CompanyParams,
  };
  const user: JWTPayload | null = await getUserFromCookie();
  if (!user) return api.unauthorized();

  // In some Next.js environments `params` itself can be a promise-like value;
  // await the params object first, then read `id` from the resolved value.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedParams = await (params as any);
  const id: string = resolvedParams?.id;

  if (user.companyId !== id) return api.forbidden();

  try {
    const company: Company | null = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) return api.badRequest("Empresa não encontrada");

    return api.ok(company);
  } catch (error) {
    console.error(error);
    return api.serverError("Erro ao buscar empresa");
  }
}
