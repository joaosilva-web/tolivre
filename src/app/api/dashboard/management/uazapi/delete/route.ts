import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

// Helper para verificar se é usuário interno do ToLivre
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  const internalDomains = ["@tolivre.com.br", "@tolivre.com"];
  return internalDomains.some((domain) => email.toLowerCase().endsWith(domain));
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    // Verifica se é staff interno do ToLivre
    if (!isToLivreStaff(user.email)) {
      return api.forbidden("Acesso restrito à equipe interna do ToLivre");
    }

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

    const url = `${UAZAPI_BASE_URL}/instance?token=${company.uazapiInstanceToken}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        token: company.uazapiInstanceToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: company.uazapiInstanceToken }),
    });

    const responseText = await response.text().catch(() => "");

    if (!response.ok) {
      console.error("[uazapi-delete] API error", response.status, responseText);
      return api.serverError(
        `Falha ao excluir instância (status ${response.status})`,
      );
    }

    await prisma.company.update({
      where: { id: user.companyId },
      data: {
        uazapiConnected: false,
        uazapiInstanceToken: null,
        uazapiInstanceName: null,
        uazapiProfileName: null,
      },
    });

    return api.ok({
      success: true,
      instanceName: company.uazapiInstanceName,
    });
  } catch (error) {
    console.error("[dashboard/management/uazapi/delete] error", error);
    return api.serverError("Erro ao excluir instância");
  }
}
