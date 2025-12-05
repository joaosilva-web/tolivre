import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { verifyTOTPToken } from "@/lib/twoFactor";
import { z } from "zod";

const verifySchema = z.object({
  token: z.string().length(6, "Código deve ter 6 dígitos"),
});

// POST /api/security/2fa/verify - Verificar código e ativar 2FA
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const body = await req.json();
    const { token } = verifySchema.parse(body);

    const settings = await prisma.userSecuritySettings.findUnique({
      where: { userId: user.id },
    });

    if (!settings?.twoFactorSecret) {
      return api.badRequest("Configure o 2FA primeiro usando /api/security/2fa/setup");
    }

    // Verificar token
    const isValid = verifyTOTPToken(token, settings.twoFactorSecret);

    if (!isValid) {
      return api.unauthorized("Código inválido ou expirado");
    }

    // Ativar 2FA
    await prisma.userSecuritySettings.update({
      where: { userId: user.id },
      data: { twoFactorEnabled: true },
    });

    // Criar log de auditoria
    try {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          companyId: user.companyId || undefined,
          action: "ENABLE_2FA",
          entity: "UserSecuritySettings",
          entityId: settings.id,
          ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
          userAgent: req.headers.get("user-agent") || "unknown",
          success: true,
        },
      });
    } catch (err) {
      console.error("Failed to create audit log:", err);
    }

    return api.ok({ message: "2FA ativado com sucesso!" });
  } catch (err) {
    console.error("Error verifying 2FA:", err);
    return api.serverError((err as Error).message || "Erro ao verificar 2FA");
  }
}
