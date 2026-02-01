import { NextRequest } from "next/server";
import { z } from "zod";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import prisma from "@/lib/prisma";
import sendWhatsAppMessage, { normalizePhone } from "@/lib/uazapi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { emitNotification } from "@/lib/websocketEmit";

const RescheduleSchema = z.object({
  startTime: z.string(), // ISO date string
});

const PublicRescheduleSchema = z.object({
  newStartTime: z.string(), // ISO date string
  newEndTime: z.string(), // ISO date string
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { id } = await params;
    const body = await req.json();
    console.log("[RESCHEDULE] Received body:", body);

    const parsed = RescheduleSchema.parse(body);
    console.log("[RESCHEDULE] Parsed data:", parsed);

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        service: {
          select: { duration: true },
        },
      },
    });

    if (!appointment) {
      console.log("[RESCHEDULE] Appointment not found:", id);
      return api.notFound("Agendamento não encontrado");
    }

    console.log("[RESCHEDULE] Appointment found:", {
      id: appointment.id,
      companyId: appointment.companyId,
      userCompanyId: user.companyId,
    });

    if (appointment.companyId !== user.companyId) {
      console.log("[RESCHEDULE] Company mismatch");
      return api.forbidden("Você não pode reagendar este agendamento");
    }

    const newStartTime = new Date(parsed.startTime);
    const newEndTime = new Date(
      newStartTime.getTime() + appointment.service.duration * 60000,
    );

    console.log("[RESCHEDULE] New times:", {
      newStartTime,
      newEndTime,
      duration: appointment.service.duration,
    });

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
      console.log("[RESCHEDULE] Conflict found:", conflict.id);
      return api.badRequest("Este horário já está ocupado");
    }

    console.log("[RESCHEDULE] No conflicts, updating...");

    // Guardar horário antigo antes de atualizar
    const oldStartTime = appointment.startTime;

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        startTime: newStartTime,
        endTime: newEndTime,
        status: "PENDING", // Reagendamento precisa de nova confirmação
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

    console.log("[RESCHEDULE] Updated successfully:", updated.id);

    // Enviar notificação em tempo real para profissionais
    const oldFormattedDate = format(oldStartTime, "dd/MM/yyyy 'às' HH:mm", {
      locale: ptBR,
    });
    const newFormattedDate = format(newStartTime, "dd/MM/yyyy 'às' HH:mm", {
      locale: ptBR,
    });

    emitNotification(updated.companyId, {
      id: `reschedule-${updated.id}`,
      type: "appointment",
      title: "Agendamento Reagendado",
      message: `${updated.clientName} foi reagendado de ${oldFormattedDate} para ${newFormattedDate}`,
      timestamp: new Date().toISOString(),
      data: { appointmentId: updated.id, action: "rescheduled" },
    });

    // Enviar notificação via WhatsApp (background)
    const clientPhone = updated.client?.phone;
    if (clientPhone) {
      const oldFormattedDate = format(oldStartTime, "dd/MM/yyyy", {
        locale: ptBR,
      });
      const oldFormattedTime = format(oldStartTime, "HH:mm", { locale: ptBR });
      const newFormattedDate = format(newStartTime, "dd/MM/yyyy", {
        locale: ptBR,
      });
      const newFormattedTime = format(newStartTime, "HH:mm", { locale: ptBR });

      const messageText =
        `Olá *${updated.clientName}*!\n\n` +
        `Seu agendamento foi *reagendado*:\n\n` +
        `❌ *Horário Anterior:*\n` +
        `📅 Data: ${oldFormattedDate}\n` +
        `⏰ Horário: ${oldFormattedTime}\n\n` +
        `✅ *Novo Horário:*\n` +
        `📅 Data: ${newFormattedDate}\n` +
        `⏰ Horário: ${newFormattedTime}\n\n` +
        `💼 *Serviço:* ${updated.service.name}\n` +
        `👤 *Profissional:* ${updated.professional.name}\n\n` +
        `Por favor, confirme o novo horário:`;

      // Normalizar telefone
      let phone = clientPhone.replace(/\D/g, "");
      if (!phone.startsWith("55")) {
        phone = "55" + phone;
      }

      console.log("[RESCHEDULE] Sending WhatsApp to:", phone);

      sendWhatsAppMessage
        .sendMenu({
          to: phone,
          text: messageText,
          choices: [
            `✅ Confirmar|confirm_${updated.id}`,
            `❌ Cancelar|cancel_${updated.id}`,
          ],
          footerText: "ToLivre - Sistema de Agendamentos",
        })
        .then((result) => {
          console.log("[RESCHEDULE] WhatsApp sent successfully:", result);
        })
        .catch((err) => {
          console.error(
            "[RESCHEDULE] Failed to send WhatsApp notification:",
            err,
          );
        });
    } else {
      console.log(
        "[RESCHEDULE] No client phone found, skipping WhatsApp notification",
      );
    }

    return api.ok(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("Error rescheduling appointment:", err);
    return api.serverError("Erro ao reagendar");
  }
}

// Rota pública para reagendamento via link (sem auth)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { newStartTime, newEndTime } = PublicRescheduleSchema.parse(body);

    const newStart = new Date(newStartTime);
    const newEnd = new Date(newEndTime);

    // Validar datas
    if (newStart < new Date()) {
      return api.badRequest("Não é possível reagendar para uma data passada");
    }

    // Buscar agendamento
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        service: true,
        professional: {
          include: {
            company: true,
          },
        },
        company: true,
        client: true,
      },
    });

    if (!appointment) {
      return api.notFound("Agendamento não encontrado");
    }

    if (appointment.status === "CANCELED") {
      return api.badRequest("Não é possível reagendar um agendamento cancelado");
    }

    // Verificar conflitos
    const conflicts = await prisma.appointment.findFirst({
      where: {
        professionalId: appointment.professionalId,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        id: {
          not: id,
        },
        OR: [
          {
            startTime: {
              lt: newEnd,
            },
            endTime: {
              gt: newStart,
            },
          },
        ],
      },
    });

    if (conflicts) {
      return api.badRequest("Horário não disponível - conflito com outro agendamento");
    }

    // Atualizar agendamento
    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        startTime: newStart,
        endTime: newEnd,
        status: "CONFIRMED",
      },
      include: {
        service: true,
        professional: true,
        company: true,
      },
    });

    // Enviar confirmação ao cliente
    if (appointment.client?.phone) {
      const phone = normalizePhone(appointment.client.phone);
      
      if (phone) {
        const dateText = format(newStart, "dd/MM/yyyy", { locale: ptBR });
        const timeText = format(newStart, "HH:mm", { locale: ptBR });
        
        const clientMessage =
          `✅ *Reagendamento Confirmado!*\n\n` +
          `Olá ${appointment.clientName}!\n\n` +
          `Seu agendamento foi reagendado com sucesso:\n\n` +
          `📅 *Nova Data/Hora:* ${dateText}, ${timeText}\n` +
          `💼 *Serviço:* ${appointment.service.name}\n` +
          `👤 *Profissional:* ${appointment.professional.name}\n` +
          `🏢 *Local:* ${appointment.company.nomeFantasia}\n\n` +
          `Nos vemos em breve! 😊`;

        sendWhatsAppMessage
          .sendText({ to: phone, message: clientMessage })
          .catch((err) => {
            console.error("[reschedule POST] Failed to send client confirmation:", err);
          });
      }
    }

    // Emitir notificação em tempo real no dashboard
    emitNotification(appointment.companyId, {
      id: `reschedule-completed-${id}`,
      type: "appointment",
      title: "Agendamento Reagendado",
      message: `${appointment.clientName} reagendou ${appointment.service.name} para ${format(newStart, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
      timestamp: new Date().toISOString(),
      data: { 
        appointmentId: id, 
        action: "rescheduled",
        newStartTime: newStart.toISOString(),
        newEndTime: newEnd.toISOString(),
      },
    });

    return api.ok({
      appointment: updated,
      message: "Agendamento reagendado com sucesso",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[reschedule POST] Error:", err);
    return api.serverError("Erro ao reagendar");
  }
}
