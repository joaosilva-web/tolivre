import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

// Schema de validação para criar conversa
const createConversationSchema = z.object({
  subject: z
    .string()
    .min(3, "Assunto deve ter no mínimo 3 caracteres")
    .max(200),
  firstMessage: z.string().min(1, "Mensagem é obrigatória").max(1000),
});

// GET - Listar conversas do usuário logado
export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    // Buscar conversas do usuário
    const conversations = await prisma.supportConversation.findMany({
      where: {
        userId: user.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1, // Última mensagem
        },
        _count: {
          select: {
            messages: {
              where: {
                isStaff: true, // Mensagens do staff
                readAt: null, // Não lidas
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Formatar resposta
    const formatted = conversations.map((conv) => ({
      id: conv.id,
      subject: conv.subject,
      status: conv.status,
      createdAt: conv.createdAt,
      updatedAt: conv.updatedAt,
      lastMessage: conv.messages[0] || null,
      unreadCount: conv._count.messages,
    }));

    return api.ok(formatted);
  } catch (err) {
    console.error("[GET /api/support/conversations] Error:", err);
    return api.serverError("Erro ao buscar conversas");
  }
}

// POST - Criar nova conversa
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    const body = await req.json();
    const parsed = createConversationSchema.parse(body);

    // Criar conversa + primeira mensagem em transação
    const conversation = await prisma.$transaction(async (tx) => {
      // Criar conversa
      const newConversation = await tx.supportConversation.create({
        data: {
          companyId: user.companyId!,
          userId: user.id,
          subject: parsed.subject,
          status: "OPEN",
        },
      });

      // Criar primeira mensagem
      await tx.supportMessage.create({
        data: {
          conversationId: newConversation.id,
          senderId: user.id,
          content: parsed.firstMessage,
          isStaff: false,
        },
      });

      // Retornar conversa com primeira mensagem
      return tx.supportConversation.findUnique({
        where: { id: newConversation.id },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      });
    });

    return api.created(conversation);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[POST /api/support/conversations] Error:", err);
    return api.serverError("Erro ao criar conversa");
  }
}
