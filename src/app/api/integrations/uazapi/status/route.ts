import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    // Authorization check
    if (user.companyId !== companyId) {
      return api.forbidden("Acesso negado a este recurso");
    }

    // Get Uazapi configuration from environment
    const UAZAPI_BASE_URL =
      process.env.UAZAPI_URL?.replace(/\/send\/text$/, "") ||
      "https://free.uazapi.com";
    const UAZAPI_TOKEN = process.env.UAZAPI_TOKEN;

    if (!UAZAPI_TOKEN) {
      return api.serverError("Configuração Uazapi não encontrada");
    }

    // Check database for connection status
    const prisma = (await import("@/lib/prisma")).default;

    if (!companyId) {
      return api.badRequest("Company ID é obrigatório");
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        uazapiConnected: true,
        uazapiInstanceName: true,
        uazapiProfileName: true,
      },
    });

    if (!company) {
      return api.notFound("Empresa não encontrada");
    }

    return api.ok({
      connected: company.uazapiConnected,
      instanceId: company.uazapiInstanceName || companyId,
      profileName: company.uazapiProfileName,
      message: company.uazapiConnected
        ? `WhatsApp conectado${
            company.uazapiProfileName ? ` - ${company.uazapiProfileName}` : ""
          }`
        : "WhatsApp não conectado",
    });
  } catch (err) {
    console.error("[uazapi-status] Error:", err);
    return api.serverError("Erro interno do servidor");
  }
}
