import { NextRequest } from "next/server";
import { z } from "zod";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import { prisma } from "@/lib/prisma";

const RescheduleSchema = z.object({
  startTime: z.string(), // ISO date string
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { id } = await params;
    const body = await req.json();
    const parsed = RescheduleSchema.parse(body);

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        service: {
          select: { duration: true },
        },
      },
    });

    if (!appointment) {
      return api.notFound("Agendamento não encontrado");
    }

    if (appointment.companyId !== user.companyId) {
      return api.forbidden("Você não pode reagendar este agendamento");
    }

    const newStartTime = new Date(parsed.startTime);
    const newEndTime = new Date(newStartTime.getTime() + appointment.service.duration * 60000);

    // Verificar conflitos (exceto o próprio agendamento)
    const conflict = await prisma.appointment.findFirst({
      where: {
        professionalId: appointment.professionalId,
        id: { not: id },
        status: { notIn: ["CANCELED"] },
        OR: [
          {
            startTime: { lte: newStartTime },
            endTime: { gt: newStartTime },
          },
          {
            startTime: { lt: newEndTime },
            endTime: { gte: newEndTime },
          },
          {
            startTime: { gte: newStartTime },
            endTime: { lte: newEndTime },
          },
        ],
      },
    });

    if (conflict) {
      return api.badRequest("Este horário já está ocupado");
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        startTime: newStartTime,
        endTime: newEndTime,
      },
      include: {
        service: true,
        professional: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        client: true,
      },
    });

    return api.ok(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("Error rescheduling appointment:", err);
    return api.serverError("Erro ao reagendar");
  }
}
