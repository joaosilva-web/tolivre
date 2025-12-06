import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

// GET - Relatório financeiro da empresa
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    // Apenas OWNER e MANAGER podem ver relatório completo
    if (user.role === "EMPLOYEE") {
      return api.forbidden("Você não tem permissão para acessar este relatório");
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Buscar todos os agendamentos do período
    const appointments = await prisma.appointment.findMany({
      where: {
        companyId: user.companyId,
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
          },
        },
        service: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Métricas gerais
    const metrics = {
      // Total de agendamentos
      totalAppointments: appointments.length,
      confirmedAppointments: appointments.filter(
        (a) => a.status === "CONFIRMED"
      ).length,
      completedAppointments: appointments.filter((a) => a.status === "COMPLETED")
        .length,
      canceledAppointments: appointments.filter((a) => a.status === "CANCELED")
        .length,

      // Receita
      totalRevenue: appointments
        .filter((a) => a.status === "COMPLETED")
        .reduce((sum, a) => sum + (a.price || 0), 0),

      // Pagamentos
      paidAmount: appointments
        .filter((a) => a.paymentStatus === "PAID")
        .reduce((sum, a) => sum + (a.paidAmount || 0), 0),

      pendingAmount: appointments
        .filter((a) => a.paymentStatus === "PENDING")
        .reduce((sum, a) => sum + (a.price || 0), 0),

      // Comissões
      totalCommissions: appointments
        .filter((a) => a.status === "COMPLETED")
        .reduce((sum, a) => sum + (a.commissionAmount || 0), 0),

      paidCommissions: appointments
        .filter((a) => a.commissionPaid)
        .reduce((sum, a) => sum + (a.commissionAmount || 0), 0),

      pendingCommissions: appointments
        .filter((a) => !a.commissionPaid && a.status === "COMPLETED")
        .reduce((sum, a) => sum + (a.commissionAmount || 0), 0),

      // Lucro líquido (receita - comissões)
      netProfit: 0, // Calculado abaixo
    };

    metrics.netProfit = metrics.totalRevenue - metrics.totalCommissions;

    // Por método de pagamento
    const paymentMethods = appointments
      .filter((a) => a.paymentMethod)
      .reduce(
        (acc, a) => {
          const method = a.paymentMethod || "Não informado";
          if (!acc[method]) {
            acc[method] = {
              count: 0,
              total: 0,
            };
          }
          acc[method].count++;
          acc[method].total += a.paidAmount || 0;
          return acc;
        },
        {} as Record<string, { count: number; total: number }>
      );

    // Por profissional
    const byProfessional = appointments.reduce(
      (acc, a) => {
        const profId = a.professionalId;
        const profName = a.professional.name;

        if (!acc[profId]) {
          acc[profId] = {
            id: profId,
            name: profName,
            appointments: 0,
            revenue: 0,
            commissions: 0,
            netRevenue: 0,
          };
        }

        acc[profId].appointments++;
        if (a.status === "COMPLETED") {
          acc[profId].revenue += a.price || 0;
          acc[profId].commissions += a.commissionAmount || 0;
          acc[profId].netRevenue += (a.price || 0) - (a.commissionAmount || 0);
        }

        return acc;
      },
      {} as Record<
        string,
        {
          id: string;
          name: string;
          appointments: number;
          revenue: number;
          commissions: number;
          netRevenue: number;
        }
      >
    );

    // Por serviço
    const byService = appointments.reduce(
      (acc, a) => {
        const serviceId = a.serviceId;
        const serviceName = a.service.name;

        if (!acc[serviceId]) {
          acc[serviceId] = {
            id: serviceId,
            name: serviceName,
            count: 0,
            revenue: 0,
          };
        }

        acc[serviceId].count++;
        if (a.status === "COMPLETED") {
          acc[serviceId].revenue += a.price || 0;
        }

        return acc;
      },
      {} as Record<string, { id: string; name: string; count: number; revenue: number }>
    );

    return api.ok({
      metrics,
      paymentMethods,
      byProfessional: Object.values(byProfessional).sort(
        (a, b) => b.revenue - a.revenue
      ),
      byService: Object.values(byService).sort((a, b) => b.count - a.count),
      period: {
        startDate: startDate || null,
        endDate: endDate || null,
      },
    });
  } catch (err) {
    console.error("[GET /api/reports/revenue] Error:", err);
    return api.serverError("Erro ao gerar relatório");
  }
}
