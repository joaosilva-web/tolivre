import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { format } from "date-fns";

// GET - Exportar agendamentos em CSV
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

    const whereClause: any = {
      companyId: user.companyId,
    };

    if (startDate && endDate) {
      whereClause.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        professional: {
          select: {
            name: true,
          },
        },
        service: {
          select: {
            name: true,
            price: true,
          },
        },
        client: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        startTime: "desc",
      },
    });

    // Gerar CSV
    const csvHeaders = [
      "Data",
      "Horário Início",
      "Horário Fim",
      "Profissional",
      "Cliente",
      "Email Cliente",
      "Telefone Cliente",
      "Serviço",
      "Valor",
      "Status",
    ].join(",");

    const csvRows = appointments.map((appointment) => {
      const data = format(new Date(appointment.startTime), "dd/MM/yyyy");
      const horaInicio = format(new Date(appointment.startTime), "HH:mm");
      const horaFim = format(new Date(appointment.endTime), "HH:mm");
      const profissional = appointment.professional.name;
      const cliente = appointment.client?.name || appointment.clientName;
      const emailCliente = appointment.client?.email || "";
      const telefoneCliente = appointment.client?.phone || "";
      const servico = appointment.service.name;
      const valor = appointment.price || appointment.service.price;
      const status = appointment.status;

      return [
        data,
        horaInicio,
        horaFim,
        profissional,
        cliente,
        emailCliente,
        telefoneCliente,
        servico,
        valor.toFixed(2),
        status,
      ]
        .map((field) => `"${field}"`)
        .join(",");
    });

    const csv = [csvHeaders, ...csvRows].join("\n");

    // Adicionar BOM para suporte UTF-8 no Excel
    const bom = "\uFEFF";
    const csvWithBom = bom + csv;

    return new Response(csvWithBom, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="agendamentos_${format(
          new Date(),
          "yyyy-MM-dd"
        )}.csv"`,
      },
    });
  } catch (err) {
    console.error("[GET /api/appointments/export] Error:", err);
    return api.serverError("Erro ao exportar agendamentos");
  }
}
