import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { z } from "zod";

const PayCommissionSchema = z.object({
  appointmentIds: z.array(z.string()),
});

// POST - Marcar comissões como pagas
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (user.role !== "OWNER") {
      return api.forbidden("Apenas o dono pode marcar comissões como pagas");
    }

    const body = await req.json();
    const { appointmentIds } = PayCommissionSchema.parse(body);

    // Atualizar agendamentos
    const result = await prisma.appointment.updateMany({
      where: {
        id: { in: appointmentIds },
        companyId: user.companyId,
        commissionPaid: false,
      },
      data: {
        commissionPaid: true,
        commissionPaidAt: new Date(),
      },
    });

    return api.ok({
      message: `${result.count} comissões marcadas como pagas`,
      count: result.count,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[POST /api/reports/commissions/pay] Error:", err);
    return api.serverError("Erro ao marcar comissões como pagas");
  }
}
