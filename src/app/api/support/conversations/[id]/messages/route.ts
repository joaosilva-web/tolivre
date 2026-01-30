import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import { emitSupportMessage } from "@/lib/websocketEmit";

// Helper para verificar se é staff
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

// Schema de validação
const sendMessageSchema = z.object({
  content: z.string().min(1, "Mensagem não pode estar vazia").max(1000),
});

// GET - Listar mensagens da conversa
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { id: conversationId } = await params;

    // Buscar conversa
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

    // Verificar permissão (owner da conversa OU staff)
    const isOwner = conversation.userId === user.id;
    const isStaff = isToLivreStaff(user.email);

    if (!isOwner && !isStaff) {
      return api.forbidden("Você não tem acesso a esta conversa");
    }

    // Buscar mensagens
    const messages = await prisma.supportMessage.findMany({
      where: { conversationId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return api.ok(messages);
  } catch (err) {
    console.error("[GET /api/support/conversations/[id]/messages] Error:", err);
    return api.serverError("Erro ao buscar mensagens");
  }
}

// POST - Enviar mensagem
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { id: conversationId } = await params;
    const body = await req.json();
    const parsed = sendMessageSchema.parse(body);

    // Buscar conversa
    const conversation = await prisma.supportConversation.findUnique({
      where: { id: conversationId },
      select: {
        userId: true,
        companyId: true,
        status: true,
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

    // Criar mensagem e atualizar conversa em transação
    const result = await prisma.$transaction(async (tx) => {
      // Criar mensagem
      const message = await tx.supportMessage.create({
        data: {
          conversationId,
          senderId: user.id,
          content: parsed.content,
          isStaff, // true se for @tolivre.app
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      // Atualizar updatedAt da conversa
      await tx.supportConversation.update({
        where: { id: conversationId },
        data: {
          updatedAt: new Date(),
        },
      });

      return message;
    });

    // Emitir evento WebSocket para notificação em tempo real
    await emitSupportMessage(conversation.companyId, {
      conversationId,
      message: {
        id: result.id,
        content: result.content,
        senderId: result.senderId,
        senderName: result.sender.name || "Usuário",
        isStaff: result.isStaff,
        createdAt: result.createdAt.toISOString(),
      },
    });

    return api.created(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error(
      "[POST /api/support/conversations/[id]/messages] Error:",
      err,
    );
    return api.serverError("Erro ao enviar mensagem");
  }
}
