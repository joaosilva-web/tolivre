// src/app/api/auth/verify-email/route.ts
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return api.badRequest("Token de verificação não fornecido");
    }

    // Buscar usuário pelo token
    const user = await prisma.user.findUnique({
      where: { verificationToken: token },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        verificationSentAt: true,
      },
    });

    if (!user) {
      return api.badRequest("Token de verificação inválido");
    }

    // Verificar se já foi verificado
    if (user.emailVerified) {
      return api.ok({
        message: "Email já verificado anteriormente",
        alreadyVerified: true,
      });
    }

    // Verificar se o token expirou (24 horas)
    const tokenAge = user.verificationSentAt
      ? Date.now() - user.verificationSentAt.getTime()
      : 0;
    const tokenExpired = tokenAge > 24 * 60 * 60 * 1000; // 24 horas em ms

    if (tokenExpired) {
      return api.badRequest(
        "Token de verificação expirado. Solicite um novo email de verificação."
      );
    }

    // Marcar email como verificado e remover o token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationSentAt: null,
      },
    });

    console.log(`[Email Verification] Email verificado: ${user.email}`);

    return api.ok({
      message: "Email verificado com sucesso! Você já pode fazer login.",
      verified: true,
    });
  } catch (err) {
    console.error("[Email Verification] Erro ao verificar email:", err);
    return api.serverError("Erro ao verificar email");
  }
}

// Rota para reenviar email de verificação
export async function PUT(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return api.badRequest("Email não fornecido");
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        verificationSentAt: true,
      },
    });

    if (!user) {
      return api.badRequest("Usuário não encontrado");
    }

    if (user.emailVerified) {
      return api.badRequest("Email já verificado");
    }

    // Verificar rate limit (não pode reenviar se o último foi há menos de 2 minutos)
    if (user.verificationSentAt) {
      const timeSinceLastSent = Date.now() - user.verificationSentAt.getTime();
      if (timeSinceLastSent < 2 * 60 * 1000) {
        // 2 minutos
        const waitTime = Math.ceil((2 * 60 * 1000 - timeSinceLastSent) / 1000);
        return api.tooMany(
          `Aguarde ${waitTime} segundos antes de solicitar um novo email`
        );
      }
    }

    // Gerar novo token
    const crypto = await import("crypto");
    const verificationToken = crypto.randomBytes(32).toString("hex");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationSentAt: new Date(),
      },
    });

    // Enviar novo email
    const { sendVerificationEmail } = await import("@/lib/email");
    const result = await sendVerificationEmail(
      user.email,
      user.name,
      verificationToken
    );

    if (!result.success) {
      return api.serverError("Erro ao enviar email de verificação");
    }

    console.log(
      `[Email Verification] Email de verificação reenviado para ${user.email}`
    );

    return api.ok({
      message: "Email de verificação enviado com sucesso!",
    });
  } catch (err) {
    console.error("[Email Verification] Erro ao reenviar email:", err);
    return api.serverError("Erro ao reenviar email de verificação");
  }
}
