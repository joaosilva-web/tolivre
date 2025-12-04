import { getUserFromCookie } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { Payment } from "@/generated/prisma";

// GET - Buscar assinatura e histórico de pagamentos
export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return api.unauthorized("Você precisa estar logado");
    }

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    // Buscar assinatura atual
    const subscription = await prisma.subscription.findUnique({
      where: { companyId: user.companyId },
    });

    // Buscar histórico de pagamentos se houver assinatura
    let payments: Payment[] = [];
    if (subscription) {
      payments = await prisma.payment.findMany({
        where: { subscriptionId: subscription.companyId },
        orderBy: { createdAt: "desc" },
        take: 10,
      });
    }

    // Contar uso atual
    const [appointmentsCount, professionalsCount] = await Promise.all([
      prisma.appointment.count({
        where: {
          companyId: user.companyId,
          startTime: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      prisma.user.count({
        where: {
          companyId: user.companyId,
          role: { in: ["OWNER", "MANAGER", "EMPLOYEE"] },
        },
      }),
    ]);

    return api.ok({
      subscription: subscription || null,
      payments,
      usage: {
        appointments: appointmentsCount,
        professionals: professionalsCount,
      },
    });
  } catch (err) {
    console.error("[GET /api/subscriptions] Error:", err);
    return api.serverError("Erro ao buscar assinatura");
  }
}
