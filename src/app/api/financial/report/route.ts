import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { startOfMonth, endOfMonth, format } from "date-fns";

// GET - Relatório financeiro
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return api.unauthorized();
    }

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa vinculada");
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Definir período (padrão: mês atual)
    const start = startDate
      ? new Date(startDate)
      : startOfMonth(new Date());
    const end = endDate
      ? new Date(endDate + "T23:59:59")
      : endOfMonth(new Date());

    // Buscar agendamentos no período
    const appointments = await prisma.appointment.findMany({
      where: {
        companyId: user.companyId,
        startTime: {
          gte: start,
          lte: end,
        },
      },
      include: {
        service: {
          select: {
            name: true,
            price: true,
          },
        },
        professional: {
          select: {
            name: true,
          },
        },
        client: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    // TODO: After migration, use paymentStatus field. For now, use status as fallback
    // Calcular totais
    const totalReceived = appointments
      .filter((apt) => apt.status === "COMPLETED")
      .reduce((sum, apt) => sum + (apt.price || 0), 0);

    const totalPending = appointments
      .filter((apt) => apt.status === "PENDING" || apt.status === "CONFIRMED")
      .reduce((sum, apt) => sum + (apt.price || 0), 0);

    const totalPartial = 0; // Will be available after migration

    const totalExpected = appointments
      .filter((apt) => apt.status !== "CANCELED")
      .reduce((sum, apt) => sum + (apt.price || 0), 0);

    const totalCanceled = appointments
      .filter((apt) => apt.status === "CANCELED")
      .reduce((sum, apt) => sum + (apt.price || 0), 0);

    // Agrupamento por método de pagamento (will be available after migration)
    const byPaymentMethod = {} as Record<string, { count: number; total: number }>;

    // Agrupamento por profissional
    const byProfessional = appointments
      .filter((apt) => apt.status === "COMPLETED")
      .reduce((acc, apt) => {
        const profName = apt.professional.name;
        if (!acc[profName]) {
          acc[profName] = { count: 0, total: 0 };
        }
        acc[profName].count++;
        acc[profName].total += apt.price || 0;
        return acc;
      }, {} as Record<string, { count: number; total: number }>);

    // Agrupamento por serviço
    const byService = appointments
      .filter((apt) => apt.status === "COMPLETED")
      .reduce((acc, apt) => {
        const serviceName = apt.service.name;
        if (!acc[serviceName]) {
          acc[serviceName] = { count: 0, total: 0 };
        }
        acc[serviceName].count++;
        acc[serviceName].total += apt.price || 0;
        return acc;
      }, {} as Record<string, { count: number; total: number }>);

    return api.ok({
      period: {
        start: format(start, "yyyy-MM-dd"),
        end: format(end, "yyyy-MM-dd"),
      },
      summary: {
        totalReceived: Math.round(totalReceived * 100) / 100,
        totalPending: Math.round(totalPending * 100) / 100,
        totalPartial: Math.round(totalPartial * 100) / 100,
        totalExpected: Math.round(totalExpected * 100) / 100,
        totalCanceled: Math.round(totalCanceled * 100) / 100,
        totalAppointments: appointments.length,
        paidAppointments: appointments.filter((apt) => apt.status === "COMPLETED").length,
        pendingAppointments: appointments.filter((apt) => apt.status === "PENDING" || apt.status === "CONFIRMED").length,
      },
      byPaymentMethod,
      byProfessional,
      byService,
      appointments: appointments.map((apt) => ({
        id: apt.id,
        date: format(new Date(apt.startTime), "yyyy-MM-dd"),
        time: format(new Date(apt.startTime), "HH:mm"),
        clientName: apt.client?.name || apt.clientName,
        professional: apt.professional.name,
        service: apt.service.name,
        price: apt.price,
        paymentStatus: apt.status, // Using status until migration is run
        paidAmount: apt.status === "COMPLETED" ? apt.price : 0,
        paymentMethod: null, // Will be available after migration
        paymentDate: apt.status === "COMPLETED" ? format(new Date(apt.startTime), "yyyy-MM-dd") : null,
      })),
    });
  } catch (err) {
    console.error("[GET /api/financial/report] Error:", err);
    return api.serverError("Erro ao gerar relatório financeiro");
  }
}
