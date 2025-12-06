import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { z } from "zod";

const UpdateProfileSchema = z.object({
  bio: z.string().optional(),
  commissionRate: z.number().min(0).max(100).optional(),
});

// PATCH - Atualizar perfil do usuário
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { id } = await params;
    const body = await req.json();
    const parsed = UpdateProfileSchema.parse(body);

    // Verificar permissões
    // Usuário pode editar próprio perfil (bio)
    // Apenas OWNER pode alterar comissão
    if (parsed.commissionRate !== undefined && user.role !== "OWNER") {
      return api.forbidden("Apenas o dono pode alterar comissões");
    }

    // Verificar se o usuário pertence à mesma empresa
    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: { companyId: true },
    });

    if (!targetUser || targetUser.companyId !== user.companyId) {
      return api.forbidden("Você não pode editar este usuário");
    }

    // Atualizar
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(parsed.bio !== undefined && { bio: parsed.bio }),
        ...(parsed.commissionRate !== undefined && {
          commissionRate: parsed.commissionRate,
        }),
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

    return api.ok(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[PATCH /api/users/:id] Error:", err);
    return api.serverError("Erro ao atualizar perfil");
  }
}
