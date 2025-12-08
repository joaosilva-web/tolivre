import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return api.unauthorized();
    }

    if (!user.companyId) {
      return api.forbidden("Usuário não vinculado a uma empresa");
    }

    // Get appointments from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const appointments = await prisma.appointment.findMany({
      where: {
        companyId: user.companyId,
        status: "CONFIRMED",
        startTime: {
          gte: thirtyDaysAgo,
        },
      },
      include: {
        service: {
          select: {
            price: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    // Group by date
    const revenueByDate = appointments.reduce(
      (
        acc: Record<string, { revenue: number; appointments: number }>,
        appointment
      ) => {
        const date = appointment.startTime.toISOString().split("T")[0];

        if (!acc[date]) {
          acc[date] = { revenue: 0, appointments: 0 };
        }

        acc[date].revenue += appointment.service.price;
        acc[date].appointments += 1;

        return acc;
      },
      {}
    );

    // Convert to array format
    const data = Object.entries(revenueByDate).map(([date, stats]) => ({
      date,
      revenue: stats.revenue,
      appointments: stats.appointments,
    }));

    return api.ok(data);
  } catch (err) {
    console.error("Error fetching revenue stats:", err);
    return api.serverError("Erro ao buscar dados de receita");
  }
}
