import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import evolution from "@/lib/evolution";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();
    if (user.companyId !== companyId) return api.forbidden("Acesso negado");
    if (!companyId) return api.badRequest("companyId é obrigatório");

    const prisma = (await import("@/lib/prisma")).default;
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        uazapiInstanceName: true,
        uazapiConnected: true,
        uazapiProfileName: true,
      },
    });

    if (!company) return api.notFound("Empresa não encontrada");

    if (!company.uazapiInstanceName) {
      return api.ok({
        connected: false,
        instanceName: null,
        profileName: null,
        message: "WhatsApp não configurado",
      });
    }

    const status = await evolution.getInstanceStatus(company.uazapiInstanceName);

    if (status.connected !== company.uazapiConnected) {
      await prisma.company.update({
        where: { id: companyId },
        data: {
          uazapiConnected: status.connected,
          uazapiProfileName: status.profileName || undefined,
          whatsappEnabled: status.connected,
        },
      });
    }

    const profileName = status.profileName || company.uazapiProfileName;

    return api.ok({
      connected: status.connected,
      instanceName: company.uazapiInstanceName,
      profileName,
      state: status.state,
      message: status.connected
        ? `WhatsApp conectado${profileName ? ` — ${profileName}` : ""}`
        : "WhatsApp desconectado",
    });
  } catch (err) {
    console.error("[evolution-status] Error:", err);
    return api.serverError("Erro ao verificar status");
  }
}
