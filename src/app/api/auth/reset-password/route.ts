import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@/generated/prisma";
import * as api from "@/app/libs/apiResponse";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Token é obrigatório"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = ResetPasswordSchema.parse(body);

    // Busca token válido (não usado e não expirado)
    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        token,
        used: false,
        expiresAt: {
          gt: new Date(), // maior que agora = ainda válido
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!passwordReset) {
      return api.badRequest(
        "Token inválido ou expirado. Solicite um novo link de recuperação.",
      );
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualiza senha e marca token como usado (transação atômica)
    await prisma.$transaction([
      // Atualiza senha
      prisma.user.update({
        where: { id: passwordReset.userId },
        data: { password: hashedPassword },
      }),
      // Marca token como usado
      prisma.passwordReset.update({
        where: { id: passwordReset.id },
        data: { used: true },
      }),
      // Invalida todos os outros tokens desse usuário (segurança)
      prisma.passwordReset.updateMany({
        where: {
          userId: passwordReset.userId,
          id: { not: passwordReset.id },
          used: false,
        },
        data: { used: true },
      }),
    ]);

    return api.ok({
      message: "Senha redefinida com sucesso! Você já pode fazer login.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return api.badRequest(
        "Dados inválidos",
        error.issues.map((e) => e.message),
      );
    }

    console.error("Erro em reset-password:", error);
    return api.serverError("Erro ao redefinir senha");
  }
}
