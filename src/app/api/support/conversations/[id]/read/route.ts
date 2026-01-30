import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

// Helper para verificar se é staff
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

// POST - Marcar mensagens como lidas
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { id: conversationId } = await params;

    // Verificar se conversa existe
    const conversation = await prisma.supportConversation.findUnique({
      where: { id: conversationId },
      select: {
        userId: true,
        companyId: true,
      },
    });

    if (!conversation) {
      return api.notFound("Conversa não encontrada");
    }

    // Verificar permissão
    const isOwner = conversation.userId === user.id;
    const isStaff = isToLivreStaff(user.email);

    if (!isOwner && !isStaff) {
      return api.forbidden("Você não tem acesso a esta conversa");
    }

    // Se é usuário, marcar mensagens do staff como lidas
    // Se é staff, marcar mensagens do usuário como lidas
    const whereCondition = isStaff
      ? { isStaff: false, readAt: null } // Staff marca mensagens do usuário
      : { isStaff: true, readAt: null }; // Usuário marca mensagens do staff

    const result = await prisma.supportMessage.updateMany({
      where: {
        conversationId,
        ...whereCondition,
      },
      data: {
        readAt: new Date(),
      },
    });

    return api.ok({
      markedCount: result.count,
      message: `${result.count} mensagens marcadas como lidas`,
    });
  } catch (err) {
    console.error("[POST /api/support/conversations/[id]/read] Error:", err);
    return api.serverError("Erro ao marcar mensagens como lidas");
  }
}
