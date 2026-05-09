import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import evolution, { toBrazilTime } from "@/lib/evolution";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { emitNotification } from "@/lib/websocketEmit";

export const runtime = "nodejs";

// Extrai o button ID de qualquer formato de mensagem da Evolution API
function extractButtonId(data: Record<string, unknown>): string | undefined {
  const msg = data?.message as Record<string, unknown> | undefined;
  if (!msg) return undefined;

  // Formato padrão Evolution API (Baileys)
  const btnResp = msg?.buttonsResponseMessage as Record<string, unknown> | undefined;
  if (btnResp?.selectedButtonId) return String(btnResp.selectedButtonId);

  // Formato alternativo
  const listResp = msg?.listResponseMessage as Record<string, unknown> | undefined;
  const rowResp = listResp?.singleSelectReply as Record<string, unknown> | undefined;
  if (rowResp?.selectedRowId) return String(rowResp.selectedRowId);

  // Formato interactiveResponseMessage
  const interactive = msg?.interactiveResponseMessage as Record<string, unknown> | undefined;
  const nativeFlow = interactive?.nativeFlowResponseMessage as Record<string, unknown> | undefined;
  if (nativeFlow?.paramsJson) {
    try {
      const params = JSON.parse(String(nativeFlow.paramsJson));
      if (params?.id) return String(params.id);
    } catch {
      // ignora
    }
  }

  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const event = body?.event as string | undefined;
    const instanceName = body?.instance as string | undefined;

    // Tratar evento de atualização de conexão
    if (event === "connection.update" || event === "CONNECTION_UPDATE") {
      const data = body?.data as Record<string, unknown> | undefined;
      const state = data?.state as string | undefined;
      const profileName = data?.profileName as string | undefined;

      if (instanceName) {
        const isConnected = state === "open";
        await prisma.company.updateMany({
          where: { uazapiInstanceName: instanceName },
          data: {
            uazapiConnected: isConnected,
            whatsappEnabled: isConnected,
            ...(profileName ? { uazapiProfileName: profileName } : {}),
          },
        });
        console.log("[evolution webhook] connection update", instanceName, state);
      }
      return api.ok({ received: true });
    }

    // Processar apenas eventos de mensagens recebidas
    if (event !== "messages.upsert" && event !== "MESSAGES_UPSERT") {
      return api.ok({ received: true });
    }

    const data = body?.data as Record<string, unknown> | undefined;
    if (!data) return api.ok({ received: true });

    // Ignorar mensagens enviadas pela própria instância
    const key = data?.key as Record<string, unknown> | undefined;
    if (key?.fromMe === true) return api.ok({ received: true });

    const buttonId = extractButtonId(data);
    if (!buttonId) {
      return api.ok({ received: true });
    }

    console.log("[evolution webhook] button id:", buttonId, "instance:", instanceName);

    const underscoreIdx = buttonId.indexOf("_");
    if (underscoreIdx === -1) return api.ok({ received: true });

    const action = buttonId.slice(0, underscoreIdx);
    const appointmentId = buttonId.slice(underscoreIdx + 1);

    if (!appointmentId || !["confirm", "cancel", "reschedule"].includes(action)) {
      return api.ok({ received: true });
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        service: true,
        professional: { include: { company: true } },
        client: true,
      },
    });

    if (!appointment) return api.ok({ received: true });

    // Resolver instância da empresa para enviar respostas
    const company = await prisma.company.findUnique({
      where: { id: appointment.companyId },
      select: { uazapiInstanceName: true, uazapiConnected: true, nomeFantasia: true, telefone: true },
    });

    const responseInstance =
      (company?.uazapiConnected && company?.uazapiInstanceName)
        ? company.uazapiInstanceName
        : (process.env.EVOLUTION_DEFAULT_INSTANCE || null);

    const sendResponse = async (to: string, message: string) => {
      if (!responseInstance) return;
      await evolution.sendText({ instanceName: responseInstance, to, message }).catch((err) => {
        console.error("[evolution webhook] falha ao enviar resposta", err);
      });
    };

    if (action === "confirm") {
      await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: "CONFIRMED" },
      });

      const dateStr = format(toBrazilTime(appointment.startTime), "dd/MM/yyyy", { locale: ptBR });
      const timeStr = format(toBrazilTime(appointment.startTime), "HH:mm", { locale: ptBR });

      if (appointment.client?.phone) {
        let phone = appointment.client.phone.replace(/\D/g, "");
        if (!phone.startsWith("55")) phone = "55" + phone;
        await sendResponse(
          phone,
          `✅ *Agendamento Confirmado!*\n\nObrigado por confirmar, ${appointment.clientName}!\n\n` +
          `📅 *Data:* ${dateStr}\n⏰ *Horário:* ${timeStr}\n` +
          `💼 *Serviço:* ${appointment.service.name}\n👤 *Profissional:* ${appointment.professional.name}\n\n` +
          `Até lá! 😊`,
        );
      }

      emitNotification(appointment.companyId, {
        id: `confirm-${appointmentId}`,
        type: "appointment",
        title: "Agendamento Confirmado",
        message: `${appointment.clientName} confirmou ${appointment.service.name}`,
        timestamp: new Date().toISOString(),
        data: { appointmentId, action: "confirmed" },
      });
    } else if (action === "cancel") {
      await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: "CANCELED" },
      });

      if (appointment.client?.phone) {
        let phone = appointment.client.phone.replace(/\D/g, "");
        if (!phone.startsWith("55")) phone = "55" + phone;
        await sendResponse(
          phone,
          `❌ *Agendamento Cancelado*\n\nSeu agendamento foi cancelado. Se precisar remarcar, entre em contato! 📞`,
        );
      }

      emitNotification(appointment.companyId, {
        id: `cancel-${appointmentId}`,
        type: "appointment",
        title: "Agendamento Cancelado",
        message: `${appointment.clientName} cancelou ${appointment.service.name}`,
        timestamp: new Date().toISOString(),
        data: { appointmentId, action: "canceled" },
      });
    } else if (action === "reschedule") {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tolivre.com.br";
      const companyPage = await prisma.companyPage.findUnique({
        where: { companyId: appointment.companyId },
        select: { slug: true },
      });

      if (!companyPage) return api.ok({ received: true });

      const rescheduleUrl = `${baseUrl}/${companyPage.slug}/reagendar/${appointmentId}`;

      if (appointment.client?.phone) {
        const phone = appointment.client.phone.replace(/\D/g, "");
        await sendResponse(
          phone.startsWith("55") ? phone : "55" + phone,
          `📅 *Reagendamento*\n\nClique no link para escolher um novo horário:\n\n🔗 ${rescheduleUrl}`,
        );
      }

      emitNotification(appointment.companyId, {
        id: `reschedule-${appointmentId}`,
        type: "appointment",
        title: "Reagendamento Solicitado",
        message: `${appointment.clientName} quer reagendar ${appointment.service.name}`,
        timestamp: new Date().toISOString(),
        data: { appointmentId, action: "reschedule_requested" },
      });
    }

    return api.ok({ received: true });
  } catch (err) {
    console.error("[evolution webhook] Error:", err);
    return api.serverError("Erro ao processar webhook");
  }
}
