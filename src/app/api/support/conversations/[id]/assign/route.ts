import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

// Helper para verificar se é staff
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

// POST - Atribuir conversa ao staff logado
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    // Verificar se é staff
    if (!isToLivreStaff(user.email)) {
      return api.forbidden("Acesso negado. Apenas staff TôLivre.");
    }

    const { id: conversationId } = await params;

    // Verificar se conversa existe
    const existing = await prisma.supportConversation.findUnique({
      where: { id: conversationId },
    });

    if (!existing) {
      return api.notFound("Conversa não encontrada");
    }

    // Atribuir ao staff logado e mudar status para IN_PROGRESS
    const updated = await prisma.supportConversation.update({
      where: { id: conversationId },
      data: {
        assignedToId: user.id,
        status: "IN_PROGRESS",
      },
      include: {
        company: {
          select: {
            id: true,
            nomeFantasia: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return api.ok(updated);
  } catch (err) {
    console.error("[POST /api/support/conversations/[id]/assign] Error:", err);
    return api.serverError("Erro ao atribuir conversa");
  }
}
