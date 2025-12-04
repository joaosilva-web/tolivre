import { NextRequest } from "next/server";
import { z } from "zod";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import { prisma } from "@/lib/prisma";
import { addDays, addWeeks, addMonths, isBefore, startOfDay } from "date-fns";

const RecurringAppointmentSchema = z.object({
  professionalId: z.string(),
  clientName: z.string().min(1),
  clientId: z.string().optional(),
  serviceId: z.string(),
  price: z.number().optional(),
  startTime: z.string(), // ISO date string
  recurrenceRule: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"]),
  recurrenceEndDate: z.string(), // ISO date string
  paymentStatus: z.enum(["PENDING", "PAID", "PARTIAL", "CANCELED"]).optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const body = await req.json();
    const parsed = RecurringAppointmentSchema.parse(body);

    // Verificar se profissional pertence à empresa
    const professional = await prisma.user.findUnique({
      where: { id: parsed.professionalId },
      select: { companyId: true },
    });

    if (!professional) {
      return api.notFound("Profissional não encontrado");
    }

    if (professional.companyId !== user.companyId) {
      return api.forbidden("Você não pode criar agendamentos para este profissional");
    }

    // Verificar se serviço pertence à empresa
    const service = await prisma.service.findUnique({
      where: { id: parsed.serviceId },
      select: { companyId: true, duration: true, price: true },
    });

    if (!service) {
      return api.notFound("Serviço não encontrado");
    }

    if (service.companyId !== user.companyId) {
      return api.forbidden("Você não pode usar este serviço");
    }

    // Gerar lista de datas baseada na recorrência
    const startDate = new Date(parsed.startTime);
    const endDate = new Date(parsed.recurrenceEndDate);
    const dates: Date[] = [];
    let currentDate = startDate;

    // Limitar a 52 ocorrências (1 ano de agendamentos semanais)
    const maxOccurrences = 52;
    let count = 0;

    while (isBefore(currentDate, endDate) && count < maxOccurrences) {
      dates.push(new Date(currentDate));
      count++;

      // Incrementar data baseado na regra
      if (parsed.recurrenceRule === "WEEKLY") {
        currentDate = addWeeks(currentDate, 1);
      } else if (parsed.recurrenceRule === "BIWEEKLY") {
        currentDate = addWeeks(currentDate, 2);
      } else if (parsed.recurrenceRule === "MONTHLY") {
        currentDate = addMonths(currentDate, 1);
      }
    }

    if (dates.length === 0) {
      return api.badRequest("Nenhum agendamento foi gerado. Verifique as datas.");
    }

    // Criar agendamento pai
    const parentAppointment = await prisma.appointment.create({
      data: {
        companyId: user.companyId,
        professionalId: parsed.professionalId,
        clientName: parsed.clientName,
        clientId: parsed.clientId,
        serviceId: parsed.serviceId,
        price: parsed.price ?? service.price,
        startTime: dates[0],
        endTime: addMinutes(dates[0], service.duration),
        status: "PENDING",
        paymentStatus: parsed.paymentStatus ?? "PENDING",
        notes: parsed.notes,
        recurrenceRule: parsed.recurrenceRule,
        recurrenceEndDate: endDate,
      },
    });

    // Criar agendamentos filhos (a partir do segundo)
    const childAppointments = await Promise.all(
      dates.slice(1).map((date) =>
        prisma.appointment.create({
          data: {
            companyId: user.companyId,
            professionalId: parsed.professionalId,
            clientName: parsed.clientName,
            clientId: parsed.clientId,
            serviceId: parsed.serviceId,
            price: parsed.price ?? service.price,
            startTime: date,
            endTime: addMinutes(date, service.duration),
            status: "PENDING",
            paymentStatus: parsed.paymentStatus ?? "PENDING",
            notes: parsed.notes,
            parentAppointmentId: parentAppointment.id,
          },
        })
      )
    );

    return api.created({
      parent: parentAppointment,
      children: childAppointments,
      totalCreated: dates.length,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("Error creating recurring appointments:", err);
    return api.serverError("Erro ao criar agendamentos recorrentes");
  }
}

// Helper function para adicionar minutos
function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}
