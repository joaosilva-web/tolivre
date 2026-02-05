import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import { checkFeatureAccess } from "@/app/libs/planGuard";

// GET - Estatísticas do dashboard
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return api.unauthorized();
    }

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa vinculada");
    }

    // Verificar se o plano tem acesso a relatórios
    const { allowed, planRequired } = await checkFeatureAccess(
      user.companyId,
      "reports",
    );
    if (!allowed) {
      return api.forbidden(
        `Relatórios e estatísticas disponíveis apenas a partir do plano ${planRequired}. Faça upgrade para acessar esta funcionalidade.`,
      );
    }

    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);
    const startOfLastMonth = startOfMonth(subMonths(now, 1));
    const endOfLastMonth = endOfMonth(subMonths(now, 1));

    // Total de agendamentos do mês atual
    const appointmentsThisMonth = await prisma.appointment.count({
      where: {
        companyId: user.companyId,
        startTime: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    // Total de agendamentos do mês passado
    const appointmentsLastMonth = await prisma.appointment.count({
      where: {
        companyId: user.companyId,
        startTime: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    // Calcular variação percentual
    const appointmentsGrowth =
      appointmentsLastMonth > 0
        ? ((appointmentsThisMonth - appointmentsLastMonth) /
            appointmentsLastMonth) *
          100
        : 0;

    // Total de clientes ativos
    const totalClients = await prisma.client.count({
      where: {
        companyId: user.companyId,
      },
    });

    // Novos clientes este mês
    const newClientsThisMonth = await prisma.client.count({
      where: {
        companyId: user.companyId,
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    // Novos clientes mês passado
    const newClientsLastMonth = await prisma.client.count({
      where: {
        companyId: user.companyId,
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    const clientsGrowth =
      newClientsLastMonth > 0
        ? ((newClientsThisMonth - newClientsLastMonth) / newClientsLastMonth) *
          100
        : 0;

    // Próximos agendamentos (hoje e futuro)
    const upcomingAppointments = await prisma.appointment.count({
      where: {
        companyId: user.companyId,
        startTime: {
          gte: now,
        },
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
    });

    // Agendamentos confirmados este mês
    const confirmedThisMonth = await prisma.appointment.count({
      where: {
        companyId: user.companyId,
        startTime: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
        status: "CONFIRMED",
      },
    });

    // Taxa de confirmação
    const confirmationRate =
      appointmentsThisMonth > 0
        ? (confirmedThisMonth / appointmentsThisMonth) * 100
        : 0;

    // Agendamentos cancelados este mês
    const canceledThisMonth = await prisma.appointment.count({
      where: {
        companyId: user.companyId,
        startTime: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
        status: "CANCELED",
      },
    });

    // Taxa de cancelamento
    const cancellationRate =
      appointmentsThisMonth > 0
        ? (canceledThisMonth / appointmentsThisMonth) * 100
        : 0;

    return api.ok({
      appointmentsThisMonth,
      appointmentsGrowth: Math.round(appointmentsGrowth * 10) / 10,
      totalClients,
      newClientsThisMonth,
      clientsGrowth: Math.round(clientsGrowth * 10) / 10,
      upcomingAppointments,
      confirmationRate: Math.round(confirmationRate * 10) / 10,
      cancellationRate: Math.round(cancellationRate * 10) / 10,
    });
  } catch (err) {
    console.error("[GET /api/stats] Error:", err);
    return api.serverError("Erro ao buscar estatísticas");
  }
}
