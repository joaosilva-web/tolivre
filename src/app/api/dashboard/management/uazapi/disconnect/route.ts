import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();
    if (!user.companyId) return api.forbidden("Empresa não identificada");

    const prisma = (await import("@/lib/prisma")).default;
    const company = await prisma.company.findUnique({
      where: { id: user.companyId },
      select: {
        uazapiInstanceToken: true,
        uazapiInstanceName: true,
      },
    });

    if (!company?.uazapiInstanceToken) {
      return api.badRequest("Instância do WhatsApp oficial não encontrada");
    }

    const UAZAPI_BASE_URL =
      process.env.UAZAPI_URL?.replace(/\/send\/text$/, "") ||
      "https://free.uazapi.com";

    const url = `${UAZAPI_BASE_URL}/instance/disconnect?token=${company.uazapiInstanceToken}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        token: company.uazapiInstanceToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: company.uazapiInstanceToken }),
    });

    const responseText = await response.text().catch(() => "");

    if (!response.ok) {
      console.error("[uazapi-disconnect] API error", response.status, responseText);
      return api.serverError(
        `Falha ao desconectar instância (status ${response.status})`,
      );
    }

    await prisma.company.update({
      where: { id: user.companyId },
      data: {
        uazapiConnected: false,
      },
    });

    return api.ok({
      success: true,
      instanceName: company.uazapiInstanceName,
    });
  } catch (error) {
    console.error("[dashboard/management/uazapi/disconnect] error", error);
    return api.serverError("Erro ao desconectar instância");
  }
}
