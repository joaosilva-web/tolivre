import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import sendWhatsAppMessage from "@/lib/uazapi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// POST - Webhook para receber eventos do UAZAPI
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[uazapi webhook] Received:", JSON.stringify(body, null, 2));

    // Verificar se é uma resposta de botão (menu interativo)
    if (body.type === "button_reply" || body.messageType === "buttonsResponseMessage") {
      const buttonId = body.selectedButtonId || body.id;

      if (!buttonId) {
        console.warn("[uazapi webhook] No button ID found");
        return api.ok({ received: true });
      }

      // Extrair ação e ID do agendamento
      const [action, appointmentId] = buttonId.split("_");

      if (!appointmentId) {
        console.warn("[uazapi webhook] Invalid button ID format:", buttonId);
        return api.ok({ received: true });
      }

      // Buscar agendamento
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: {
          service: true,
          professional: {
            include: {
              company: true,
            },
          },
          client: true,
        },
      });

      if (!appointment) {
        console.warn("[uazapi webhook] Appointment not found:", appointmentId);
        return api.ok({ received: true });
      }

      // Processar ação
      if (action === "confirm") {
        // Confirmar agendamento
        await prisma.appointment.update({
          where: { id: appointmentId },
          data: { status: "CONFIRMED" },
        });

        const formattedDate = format(appointment.startTime, "dd/MM/yyyy", {
          locale: ptBR,
        });
        const formattedTime = format(appointment.startTime, "HH:mm", {
          locale: ptBR,
        });

        const confirmationMessage =
          `✅ *Agendamento Confirmado!*\n\n` +
          `Obrigado por confirmar, ${appointment.clientName}!\n\n` +
          `Seu agendamento está confirmado:\n\n` +
          `📅 *Data:* ${formattedDate}\n` +
          `⏰ *Horário:* ${formattedTime}\n` +
          `💼 *Serviço:* ${appointment.service.name}\n` +
          `👤 *Profissional:* ${appointment.professional.name}\n` +
          `🏢 *Local:* ${appointment.professional.company?.nomeFantasia || "ToLivre"}\n\n` +
          `Até lá! 😊`;

        // Enviar mensagem de confirmação
        if (appointment.client?.phone) {
          let phone = appointment.client.phone.replace(/\D/g, "");
          if (!phone.startsWith("55")) {
            phone = "55" + phone;
          }

          sendWhatsAppMessage
            .sendText({ to: phone, message: confirmationMessage })
            .catch((err) => {
              console.error(
                "[uazapi webhook] Failed to send confirmation:",
                err,
              );
            });
        }

        console.log(
          "[uazapi webhook] Appointment confirmed:",
          appointmentId,
        );
      } else if (action === "cancel") {
        // Cancelar agendamento
        await prisma.appointment.update({
          where: { id: appointmentId },
          data: { status: "CANCELED" },
        });

        const cancellationMessage =
          `❌ *Agendamento Cancelado*\n\n` +
          `Seu agendamento foi cancelado com sucesso.\n\n` +
          `Se precisar remarcar, entre em contato conosco! 📞`;

        // Enviar mensagem de cancelamento
        if (appointment.client?.phone) {
          let phone = appointment.client.phone.replace(/\D/g, "");
          if (!phone.startsWith("55")) {
            phone = "55" + phone;
          }

          sendWhatsAppMessage
            .sendText({ to: phone, message: cancellationMessage })
            .catch((err) => {
              console.error(
                "[uazapi webhook] Failed to send cancellation:",
                err,
              );
            });
        }

        console.log("[uazapi webhook] Appointment canceled:", appointmentId);
      }
    }

    return api.ok({ received: true });
  } catch (err) {
    console.error("[uazapi webhook] Error:", err);
    return api.serverError("Erro ao processar webhook");
  }
}
