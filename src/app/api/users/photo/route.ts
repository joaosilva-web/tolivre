import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

// POST - Upload de foto do profissional
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const formData = await req.formData();
    const file = formData.get("photo") as File;
    const targetUserId = formData.get("userId") as string | null;

    if (!file) {
      return api.badRequest("Nenhuma foto enviada");
    }

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return api.badRequest("Foto muito grande. Máximo 5MB");
    }

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      return api.badRequest("Arquivo deve ser uma imagem");
    }

    // Determinar qual usuário atualizar
    let userIdToUpdate = user.id;

    // Se um userId foi fornecido, verificar permissões
    if (targetUserId && targetUserId !== user.id) {
      // Apenas OWNER ou MANAGER podem atualizar fotos de outros
      const isOwnerOrManager = user.roles?.includes("OWNER") || user.roles?.includes("MANAGER");
      
      if (!isOwnerOrManager) {
        return api.forbidden("Você não pode atualizar fotos de outros usuários");
      }

      // Verificar se o usuário alvo pertence à mesma empresa
      const targetUser = await prisma.user.findUnique({
        where: { id: targetUserId },
        select: { companyId: true },
      });

      if (!targetUser || targetUser.companyId !== user.companyId) {
        return api.forbidden("Você não pode atualizar fotos de usuários de outra empresa");
      }

      userIdToUpdate = targetUserId;
    }

    // Converter para base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const photoUrl = `data:${file.type};base64,${base64}`;

    // Atualizar usuário
    const updated = await prisma.user.update({
      where: { id: userIdToUpdate },
      data: { photoUrl },
    });

    console.log(`[Photo Upload] User ${user.id} uploaded photo for user ${userIdToUpdate}`);

    return api.ok({
      message: "Foto atualizada com sucesso",
      photoUrl: updated.photoUrl,
      userId: updated.id,
    });
  } catch (err) {
    console.error("[POST /api/users/photo] Error:", err);
    return api.serverError("Erro ao fazer upload da foto");
  }
}

// DELETE - Remover foto do profissional
export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    await prisma.user.update({
      where: { id: user.id },
      data: { photoUrl: null },
    });

    return api.ok({ message: "Foto removida com sucesso" });
  } catch (err) {
    console.error("[DELETE /api/users/photo] Error:", err);
    return api.serverError("Erro ao remover foto");
  }
}
