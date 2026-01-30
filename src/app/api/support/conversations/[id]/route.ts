import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import { emitSupportConversationUpdated } from "@/lib/websocketEmit";

// Helper para verificar se é staff
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

// Schema de validação
const updateConversationSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  assignedToId: z.string().optional(),
});

// PATCH - Atualizar conversa (apenas staff)
export async function PATCH(
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
    const body = await req.json();
    const parsed = updateConversationSchema.parse(body);

    // Verificar se conversa existe
    const existing = await prisma.supportConversation.findUnique({
      where: { id: conversationId },
    });

    if (!existing) {
      return api.notFound("Conversa não encontrada");
    }

    // Preparar dados para atualização
    const updateData: {
      status?: "OPEN" | "IN_PROGRESS" | "CLOSED";
      assignedToId?: string;
      closedAt?: Date;
    } = {};

    if (parsed.status !== undefined) {
      updateData.status = parsed.status;

      // Se fechar, setar closedAt
      if (parsed.status === "CLOSED") {
        updateData.closedAt = new Date();
      }
    }

    if (parsed.assignedToId !== undefined) {
      updateData.assignedToId = parsed.assignedToId;
    }

    // Atualizar conversa
    const updated = await prisma.supportConversation.update({
      where: { id: conversationId },
      data: updateData,
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

    // Emitir evento WebSocket para notificação em tempo real
    await emitSupportConversationUpdated(updated.company.id, {
      conversationId,
      status: updated.status as "OPEN" | "IN_PROGRESS" | "CLOSED",
      assignedToId: updated.assignedToId || undefined,
      assignedToName: updated.assignedTo?.name || undefined,
      closedAt: updated.closedAt?.toISOString() || undefined,
    });

    return api.ok(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[PATCH /api/support/conversations/[id]] Error:", err);
    return api.serverError("Erro ao atualizar conversa");
  }
}
