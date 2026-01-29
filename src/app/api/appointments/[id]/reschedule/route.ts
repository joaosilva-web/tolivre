import { NextRequest } from "next/server";
import { z } from "zod";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import prisma from "@/lib/prisma";
import sendWhatsAppMessage from "@/lib/uazapi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const RescheduleSchema = z.object({
  startTime: z.string(), // ISO date string
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
