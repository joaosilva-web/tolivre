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

    // Get appointments from current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const appointments = await prisma.appointment.findMany({
      where: {
        companyId: user.companyId,
        startTime: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      include: {
        service: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    // Group by service
    const serviceStats = appointments.reduce(
      (
        acc: Record<string, { count: number; revenue: number }>,
        appointment
      ) => {
        const serviceName = appointment.service.name;

        if (!acc[serviceName]) {
          acc[serviceName] = { count: 0, revenue: 0 };
        }

        acc[serviceName].count += 1;
        acc[serviceName].revenue += appointment.service.price;

        return acc;
      },
      {}
    );

    // Convert to array and sort by count
    const data = Object.entries(serviceStats)
      .map(([name, stats]) => ({
        name,
        count: stats.count,
        revenue: stats.revenue,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 services

    return api.ok(data);
  } catch (err) {
    console.error("Error fetching popular services:", err);
    return api.serverError("Erro ao buscar serviços populares");
  }
}
