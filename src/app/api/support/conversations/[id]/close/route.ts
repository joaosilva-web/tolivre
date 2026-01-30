import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

// Helper para verificar se é staff
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

// POST - Fechar conversa
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

    // Fechar conversa
    const updated = await prisma.supportConversation.update({
      where: { id: conversationId },
      data: {
        status: "CLOSED",
        closedAt: new Date(),
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
    console.error("[POST /api/support/conversations/[id]/close] Error:", err);
    return api.serverError("Erro ao fechar conversa");
  }
}
