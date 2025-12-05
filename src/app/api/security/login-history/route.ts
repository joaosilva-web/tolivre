import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";

// GET /api/security/login-history - Histórico de logins do usuário
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { searchParams } = req.nextUrl;
    const page = Number(searchParams.get("page") || "1");
    const pageSize = Number(searchParams.get("pageSize") || "20");

    const total = await prisma.loginHistory.count({
      where: { userId: user.id },
    });

    const history = await prisma.loginHistory.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      skip: (Math.max(1, page) - 1) * pageSize,
      take: pageSize,
    });

    return api.ok({ data: history, total, page, pageSize });
  } catch (err) {
    return api.serverError((err as Error).message || "Erro ao buscar histórico");
  }
}
