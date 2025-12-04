import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";

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

    // Calcular totais
    const totalReceived = appointments
      .filter((apt) => apt.paymentStatus === "PAID")
      .reduce((sum, apt) => sum + (apt.paidAmount || apt.price || 0), 0);

    const totalPending = appointments
      .filter((apt) => apt.paymentStatus === "PENDING")
      .reduce((sum, apt) => sum + (apt.price || 0), 0);

    const totalPartial = appointments
      .filter((apt) => apt.paymentStatus === "PARTIAL")
      .reduce(
        (sum, apt) => sum + ((apt.price || 0) - (apt.paidAmount || 0)),
        0
      );

    const totalExpected = appointments
      .filter((apt) => apt.status !== "CANCELED" && apt.paymentStatus !== "CANCELED")
      .reduce((sum, apt) => sum + (apt.price || 0), 0);

    const totalCanceled = appointments
      .filter((apt) => apt.status === "CANCELED" || apt.paymentStatus === "CANCELED")
      .reduce((sum, apt) => sum + (apt.price || 0), 0);

    // Agrupamento por método de pagamento
    const byPaymentMethod = appointments
      .filter((apt) => apt.paymentStatus === "PAID" && apt.paymentMethod)
      .reduce((acc, apt) => {
        const method = apt.paymentMethod || "Não informado";
        if (!acc[method]) {
          acc[method] = { count: 0, total: 0 };
        }
        acc[method].count++;
        acc[method].total += apt.paidAmount || apt.price || 0;
        return acc;
      }, {} as Record<string, { count: number; total: number }>);

    // Agrupamento por profissional
    const byProfessional = appointments
      .filter((apt) => apt.paymentStatus === "PAID")
      .reduce((acc, apt) => {
        const profName = apt.professional.name;
        if (!acc[profName]) {
          acc[profName] = { count: 0, total: 0 };
        }
        acc[profName].count++;
        acc[profName].total += apt.paidAmount || apt.price || 0;
        return acc;
      }, {} as Record<string, { count: number; total: number }>);

    // Agrupamento por serviço
    const byService = appointments
      .filter((apt) => apt.paymentStatus === "PAID")
      .reduce((acc, apt) => {
        const serviceName = apt.service.name;
        if (!acc[serviceName]) {
          acc[serviceName] = { count: 0, total: 0 };
        }
        acc[serviceName].count++;
        acc[serviceName].total += apt.paidAmount || apt.price || 0;
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
        paidAppointments: appointments.filter((apt) => apt.paymentStatus === "PAID").length,
        pendingAppointments: appointments.filter((apt) => apt.paymentStatus === "PENDING").length,
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
        paymentStatus: apt.paymentStatus,
        paidAmount: apt.paidAmount,
        paymentMethod: apt.paymentMethod,
        paymentDate: apt.paymentDate ? format(new Date(apt.paymentDate), "yyyy-MM-dd") : null,
      })),
    });
  } catch (err) {
    console.error("[GET /api/financial/report] Error:", err);
    return api.serverError("Erro ao gerar relatório financeiro");
  }
}
