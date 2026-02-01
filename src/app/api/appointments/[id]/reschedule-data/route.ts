import { NextRequest } from "next/server";
import * as api from "@/app/libs/apiResponse";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Buscar agendamento com relacionamentos
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        service: true,
        professional: {
          include: {
            company: {
              include: {
                companyPage: true,
              },
            },
          },
        },
        company: {
          include: {
            companyPage: true,
          },
        },
        client: true,
      },
    });

    if (!appointment) {
      return api.notFound("Agendamento não encontrado");
    }

    // Não permitir reagendamento de agendamentos cancelados
    if (appointment.status === "CANCELED") {
      return api.badRequest("Não é possível reagendar um agendamento cancelado");
    }

    // Buscar horários de trabalho da empresa
    const workingHours = await prisma.workingHours.findMany({
      where: {
        companyId: appointment.companyId,
      },
    });

    // Buscar agendamentos existentes do profissional (para calcular slots disponíveis)
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        professionalId: appointment.professionalId,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        startTime: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
      },
    });

    return api.ok({
      appointment: {
        id: appointment.id,
        clientName: appointment.clientName,
        clientPhone: appointment.client?.phone || null,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        service: {
          id: appointment.service.id,
          name: appointment.service.name,
          duration: appointment.service.duration,
          price: appointment.service.price,
        },
        professional: {
          id: appointment.professional.id,
          name: appointment.professional.name,
        },
        company: {
          id: appointment.company.id,
          slug: appointment.company.companyPage?.slug || "",
          nomeFantasia: appointment.company.nomeFantasia,
          primaryColor: appointment.company.companyPage?.primaryColor || "#000000",
          accentColor: appointment.company.companyPage?.accentColor || "#000000",
        },
      },
      workingHours,
      existingAppointments: existingAppointments.map((apt) => ({
        id: apt.id,
        startTime: apt.startTime.toISOString(),
        endTime: apt.endTime.toISOString(),
        duration: apt.service.duration,
      })),
    });
  } catch (err) {
    console.error("[reschedule-data] Error:", err);
    return api.serverError("Erro ao buscar dados para reagendamento");
  }
}
