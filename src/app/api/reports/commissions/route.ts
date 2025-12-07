import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

// GET - Relatório de comissões
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const professionalId = searchParams.get("professionalId");

    // Buscar agendamentos completados e pagos
    const appointments = await prisma.appointment.findMany({
      where: {
        companyId: user.companyId,
        status: "COMPLETED",
        paymentStatus: "PAID",
        ...(professionalId && { professionalId }),
        ...(startDate &&
          endDate && {
            startTime: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          }),
      },
      include: {
        professional: {
          select: {
            id: true,
            name: true,
            email: true,
            photoUrl: true,
            commissionRate: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
          },
        },
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        startTime: "desc",
      },
    });

    // Agrupar por profissional
    const professionalStats = appointments.reduce((acc, apt) => {
      const profId = apt.professionalId;

      if (!acc[profId]) {
        acc[profId] = {
          professional: apt.professional,
          totalAppointments: 0,
          totalRevenue: 0,
          totalCommission: 0,
          commissionPaid: 0,
          commissionPending: 0,
          appointments: [],
        };
      }

      acc[profId].totalAppointments++;
      acc[profId].totalRevenue += apt.price || 0;
      acc[profId].totalCommission += apt.commissionAmount || 0;

      if (apt.commissionPaid) {
        acc[profId].commissionPaid += apt.commissionAmount || 0;
      } else {
        acc[profId].commissionPending += apt.commissionAmount || 0;
      }

      acc[profId].appointments.push({
        id: apt.id,
        startTime: apt.startTime,
        service: apt.service,
        client: apt.client?.name || apt.clientName,
        price: apt.price,
        commissionRate: apt.commissionRate,
        commissionAmount: apt.commissionAmount,
        commissionPaid: apt.commissionPaid,
        commissionPaidAt: apt.commissionPaidAt,
      });

      return acc;
    }, {} as Record<string, any>);

    const report = Object.values(professionalStats);

    // Totais gerais
    const totals = {
      totalAppointments: appointments.length,
      totalRevenue: appointments.reduce(
        (sum, apt) => sum + (apt.price || 0),
        0
      ),
      totalCommission: appointments.reduce(
        (sum, apt) => sum + (apt.commissionAmount || 0),
        0
      ),
      commissionPaid: appointments
        .filter((apt) => apt.commissionPaid)
        .reduce((sum, apt) => sum + (apt.commissionAmount || 0), 0),
      commissionPending: appointments
        .filter((apt) => !apt.commissionPaid)
        .reduce((sum, apt) => sum + (apt.commissionAmount || 0), 0),
    };

    return api.ok({
      report,
      totals,
      period: {
        startDate: startDate || null,
        endDate: endDate || null,
      },
    });
  } catch (err) {
    console.error("[GET /api/reports/commissions] Error:", err);
    return api.serverError("Erro ao gerar relatório");
  }
}
