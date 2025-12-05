import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { compare } from "bcrypt";
import { z } from "zod";

const disableSchema = z.object({
  password: z.string().min(1, "Senha é obrigatória"),
});

// POST /api/security/2fa/disable - Desativar 2FA (requer senha)
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const body = await req.json();
    const { password } = disableSchema.parse(body);

    // Verificar senha
    const userWithPassword = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userWithPassword) {
      return api.notFound("Usuário não encontrado");
    }

    const isValidPassword = await compare(password, userWithPassword.password);
    if (!isValidPassword) {
      return api.unauthorized("Senha incorreta");
    }

    // Desativar 2FA
    await prisma.userSecuritySettings.update({
      where: { userId: user.id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        backupCodes: [],
      },
    });

    // Criar log de auditoria
    try {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          companyId: user.companyId || undefined,
          action: "DISABLE_2FA",
          entity: "UserSecuritySettings",
          entityId: user.id,
          ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
          userAgent: req.headers.get("user-agent") || "unknown",
          success: true,
        },
      });
    } catch (err) {
      console.error("Failed to create audit log:", err);
    }

    return api.ok({ message: "2FA desativado com sucesso" });
  } catch (err) {
    console.error("Error disabling 2FA:", err);
    return api.serverError((err as Error).message || "Erro ao desativar 2FA");
  }
}
