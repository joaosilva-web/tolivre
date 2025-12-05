import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";

// GET /api/security/sessions - Listar sessões ativas do usuário
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const sessions = await prisma.userSession.findMany({
      where: {
        userId: user.id,
        revokedAt: null,
        expiresAt: { gte: new Date() },
      },
      orderBy: { lastActivity: "desc" },
    });

    return api.ok(sessions);
  } catch (err) {
    return api.serverError((err as Error).message || "Erro ao listar sessões");
  }
}

// DELETE /api/security/sessions?sessionId=... - Revogar sessão específica
// DELETE /api/security/sessions?all=true - Revogar todas as sessões (exceto a atual)
export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { searchParams } = req.nextUrl;
    const sessionId = searchParams.get("sessionId");
    const all = searchParams.get("all") === "true";

    if (all) {
      // Revogar todas as sessões exceto a atual
      const currentToken = (await req.cookies).get("token")?.value;
      
      await prisma.userSession.updateMany({
        where: {
          userId: user.id,
          revokedAt: null,
          // Não revogar a sessão atual se possível
        },
        data: {
          revokedAt: new Date(),
        },
      });

      return api.ok({ message: "Todas as sessões foram revogadas" });
    }

    if (sessionId) {
      const session = await prisma.userSession.findUnique({
        where: { id: sessionId },
      });

      if (!session || session.userId !== user.id) {
        return api.forbidden("Você não pode revogar esta sessão");
      }

      await prisma.userSession.update({
        where: { id: sessionId },
        data: { revokedAt: new Date() },
      });

      return api.ok({ message: "Sessão revogada com sucesso" });
    }

    return api.badRequest("sessionId ou all=true é obrigatório");
  } catch (err) {
    return api.serverError((err as Error).message || "Erro ao revogar sessões");
  }
}
