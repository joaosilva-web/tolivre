// app/api/auth/login/route.ts
// NextResponse is not directly used here; `api.ok` returns a NextResponse when needed
import { PrismaClient } from "@/generated/prisma";
import { compare } from "bcrypt";
import { signToken } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import {
  parseUserAgent,
  generateSessionToken,
  isNewDevice,
  isIpSuspicious,
  calculateLoginRiskScore,
} from "@/lib/security";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, twoFactorToken } = await req.json();

  // Extrair informações da requisição
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";
  const deviceInfo = parseUserAgent(userAgent);

  const user = await prisma.user.findUnique({ where: { email } });

  // Registrar tentativa de login (sucesso ou falha)
  const logLoginAttempt = async (success: boolean, failReason?: string) => {
    try {
      await prisma.loginAttempt.create({
        data: {
          email,
          ip,
          success,
          createdAt: new Date(),
        },
      });

      if (user) {
        await prisma.loginHistory.create({
          data: {
            userId: user.id,
            ip,
            userAgent,
            device: deviceInfo.device,
            browser: deviceInfo.browser,
            os: deviceInfo.os,
            success,
            failReason,
          },
        });
      }
    } catch (err) {
      console.error("[Security] Failed to log login attempt:", err);
    }
  };

  if (!user) {
    await logLoginAttempt(false, "Usuário não encontrado");
    return api.unauthorized("Usuário não encontrado");
  }

  // Verificar se o email foi verificado
  if (!user.emailVerified) {
    await logLoginAttempt(false, "Email não verificado");
    return api.forbidden(
      "Por favor, verifique seu email antes de fazer login. Verifique sua caixa de entrada e spam."
    );
  }

  // Verificar bloqueio por tentativas falhadas (últimas 24h)
  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const failedAttempts = await prisma.loginAttempt.count({
    where: {
      email,
      success: false,
      createdAt: { gte: last24h },
    },
  });

  if (failedAttempts >= 5) {
    await logLoginAttempt(
      false,
      "Conta temporariamente bloqueada por excesso de tentativas"
    );
    return api.tooMany(
      "Muitas tentativas de login falhadas. Tente novamente em 24 horas."
    );
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    await logLoginAttempt(false, "Senha inválida");
    return api.unauthorized("Senha inválida");
  }

  // Verificar 2FA se estiver habilitado
  const securitySettings = await prisma.userSecuritySettings.findUnique({
    where: { userId: user.id },
  });

  if (securitySettings?.twoFactorEnabled) {
    if (!twoFactorToken) {
      // Senha correta mas falta o código 2FA
      return api.ok({
        requires2FA: true,
        message: "Digite o código do seu aplicativo autenticador",
      });
    }

    // Verificar código 2FA
    const { verifyTOTPToken, verifyBackupCode } = await import(
      "@/lib/twoFactor"
    );

    let twoFactorValid = false;

    // Primeiro tenta TOTP
    if (securitySettings.twoFactorSecret) {
      twoFactorValid = verifyTOTPToken(
        twoFactorToken,
        securitySettings.twoFactorSecret
      );
    }

    // Se não for válido, tenta código de backup
    if (!twoFactorValid && securitySettings.backupCodes.length > 0) {
      const backupResult = await verifyBackupCode(
        twoFactorToken,
        securitySettings.backupCodes as string[]
      );

      if (backupResult.valid) {
        twoFactorValid = true;

        // Remover código usado
        const updatedCodes = (securitySettings.backupCodes as string[]).filter(
          (_, index) => index !== backupResult.usedIndex
        );

        await prisma.userSecuritySettings.update({
          where: { userId: user.id },
          data: { backupCodes: updatedCodes },
        });
      }
    }

    if (!twoFactorValid) {
      await logLoginAttempt(false, "Código 2FA inválido");
      return api.unauthorized("Código 2FA inválido ou expirado");
    }
  }

  // Analisar contexto de segurança
  const recentLogins = await prisma.loginHistory.findMany({
    where: {
      userId: user.id,
      success: true,
      createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Últimos 30 dias
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const lastLogin = recentLogins[0];
  const previousDevices = recentLogins.map((l) => ({
    device: l.device || "",
    browser: l.browser || "",
    os: l.os || "",
  }));

  const isNewDev = isNewDevice(deviceInfo, previousDevices);
  const isNewIp = lastLogin ? lastLogin.ip !== ip : true;
  const isSuspiciousIp = lastLogin ? isIpSuspicious(ip, lastLogin.ip) : false;
  const timeSinceLastLogin = lastLogin
    ? (Date.now() - lastLogin.createdAt.getTime()) / (1000 * 60 * 60)
    : 999;

  const riskScore = calculateLoginRiskScore({
    isNewDevice: isNewDev,
    isNewIp,
    isSuspiciousIp,
    failedAttemptsLast24h: failedAttempts,
    timeSinceLastLogin,
  });

  // Gerar token e criar sessão
  const sessionToken = generateSessionToken();
  const token = signToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    companyId: user.companyId,
  });

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Criar sessão no banco
  try {
    await prisma.userSession.create({
      data: {
        userId: user.id,
        token: sessionToken,
        ip,
        userAgent,
        device: deviceInfo.device,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        expiresAt,
      },
    });

    await logLoginAttempt(true);

    // Se for novo dispositivo ou alto risco, notificar (via WebSocket)
    if ((isNewDev || riskScore > 50) && user.companyId) {
      try {
        const { emitNotification } = await import("@/lib/websocket");
        emitNotification(user.companyId, {
          id: `security-${user.id}-${Date.now()}`,
          type: "system",
          title: isNewDev ? "Novo dispositivo detectado" : "Login suspeito",
          message: `Login realizado de ${deviceInfo.device} (${
            deviceInfo.browser
          } em ${deviceInfo.os}) do IP ${ip}. ${
            isNewDev ? "Este é um novo dispositivo." : ""
          } ${riskScore > 50 ? `Score de risco: ${riskScore}/100` : ""}`,
          timestamp: new Date().toISOString(),
          data: { riskScore, deviceInfo, ip },
        });
      } catch (err) {
        console.error("[Security] Failed to send security notification:", err);
      }
    }
  } catch (err) {
    console.error("[Security] Failed to create session:", err);
  }

  const res = api.ok({
    message: "Login realizado com sucesso",
    token,
    security: {
      isNewDevice: isNewDev,
      riskScore,
    },
  });
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
