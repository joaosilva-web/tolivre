import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { setupTwoFactor, hashBackupCodes } from "@/lib/twoFactor";

// POST /api/security/2fa/setup - Iniciar configuração do 2FA
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    // Verificar se já tem 2FA ativo
    const settings = await prisma.userSecuritySettings.findUnique({
      where: { userId: user.id },
    });

    if (settings?.twoFactorEnabled) {
      return api.badRequest("2FA já está ativo. Desative antes de reconfigurar.");
    }

    // Gerar segredo e QR code
    const { secret, qrCodeUrl, backupCodes } = await setupTwoFactor(user.email);

    // Hashear códigos de backup
    const hashedCodes = await hashBackupCodes(backupCodes);

    // Salvar temporariamente (não ativar ainda)
    await prisma.userSecuritySettings.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        twoFactorEnabled: false, // Ainda não ativo
        twoFactorSecret: secret,
        backupCodes: hashedCodes,
      },
      update: {
        twoFactorSecret: secret,
        backupCodes: hashedCodes,
      },
    });

    return api.ok({
      qrCodeUrl,
      backupCodes, // Mostrar apenas uma vez
      message: "Escaneie o QR code com seu app autenticador e confirme com um código",
    });
  } catch (err) {
    console.error("Error setting up 2FA:", err);
    return api.serverError((err as Error).message || "Erro ao configurar 2FA");
  }
}
