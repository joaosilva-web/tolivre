import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

// Helper para verificar se é usuário do staff TôLivre
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

// GET - Listar TODAS conversas (apenas para staff)
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    // Verificar se é staff
    if (!isToLivreStaff(user.email)) {
      return api.forbidden("Acesso negado. Apenas staff TôLivre.");
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // OPEN, IN_PROGRESS, CLOSED
    const companyId = searchParams.get("companyId");
    const skip = parseInt(searchParams.get("skip") || "0");
    const take = parseInt(searchParams.get("take") || "50");

    // Construir filtros
    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (companyId) {
      where.companyId = companyId;
    }

    // Buscar conversas
    const [conversations, total] = await Promise.all([
      prisma.supportConversation.findMany({
        where,
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
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1, // Última mensagem
          },
          _count: {
            select: {
              messages: {
                where: {
                  isStaff: false, // Mensagens do usuário
                  readAt: null, // Não lidas
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip,
        take,
      }),
      prisma.supportConversation.count({ where }),
    ]);

    // Formatar resposta
    const formatted = conversations.map((conv) => ({
      id: conv.id,
      subject: conv.subject,
      status: conv.status,
      company: conv.company,
      user: conv.user,
      assignedTo: conv.assignedTo,
      lastMessage: conv.messages[0] || null,
      unreadCount: conv._count.messages,
      createdAt: conv.createdAt,
      updatedAt: conv.updatedAt,
      closedAt: conv.closedAt,
    }));

    return api.ok({
      conversations: formatted,
      total,
      skip,
      take,
    });
  } catch (err) {
    console.error("[GET /api/support/admin/conversations] Error:", err);
    return api.serverError("Erro ao buscar conversas");
  }
}
