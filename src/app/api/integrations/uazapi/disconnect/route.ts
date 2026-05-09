import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import evolution from "@/lib/evolution";

export async function POST(req: NextRequest) {
  try {
    const { companyId } = await req.json();
    if (!companyId) return api.badRequest("companyId é obrigatório");

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();
    if (user.companyId !== companyId) return api.forbidden("Acesso negado");

    const prisma = (await import("@/lib/prisma")).default;
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { uazapiInstanceName: true },
    });

    if (!company?.uazapiInstanceName) {
      return api.badRequest("Nenhuma instância WhatsApp configurada");
    }

    await evolution.logoutInstance(company.uazapiInstanceName);

    await prisma.company.update({
      where: { id: companyId },
      data: {
        uazapiConnected: false,
        uazapiProfileName: null,
        whatsappEnabled: false,
      },
    });

    return api.ok({ message: "WhatsApp desconectado com sucesso" });
  } catch (err) {
    console.error("[evolution-disconnect] Error:", err);
    return api.serverError("Erro ao desconectar WhatsApp");
  }
}
