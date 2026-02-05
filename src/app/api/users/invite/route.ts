import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import { checkProfessionalLimit } from "@/app/libs/planGuard";
import { z } from "zod";

const inviteSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["EMPLOYEE", "MANAGER"]).default("EMPLOYEE"),
});

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) return api.unauthorized();

  // Apenas OWNER pode convidar profissionais
  if (user.role !== "OWNER") {
    return api.forbidden("Apenas o proprietário pode adicionar profissionais");
  }

  if (!user.companyId) {
    return api.badRequest("Usuário não está vinculado a uma empresa");
  }

  try {
    const body = await req.json();
    const validatedData = inviteSchema.parse(body);

    // Verificar limite de profissionais do plano
    const limitCheck = await checkProfessionalLimit(user.companyId);
    if (!limitCheck.allowed) {
      return api.badRequest(
        `Limite de ${limitCheck.limit} profissionais atingido. Faça upgrade do seu plano para adicionar mais profissionais.`,
        { current: limitCheck.current, limit: limitCheck.limit },
      );
    }

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return api.badRequest("Este email já está cadastrado");
    }

    // Criar novo profissional
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const newProfessional = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        companyId: user.companyId,
        emailVerified: true, // Profissionais convidados já são verificados
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        photoUrl: true,
        bio: true,
        commissionRate: true,
      },
    });

    return api.created(newProfessional);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return api.badRequest(
        firstError?.message || "Dados inválidos",
        error.issues,
      );
    }

    console.error("[API] Erro ao criar profissional:", error);
    return api.serverError("Erro ao criar profissional");
  }
}
