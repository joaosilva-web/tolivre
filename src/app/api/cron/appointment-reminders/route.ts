import { NextRequest } from "next/server";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import evolution, { normalizePhone, toBrazilTime } from "@/lib/evolution";
import { PLANS, type PlanName } from "@/lib/subscriptionLimits";

const DEFAULT_BATCH_SIZE = Number(process.env.APPOINTMENT_REMINDER_BATCH_SIZE || "50");
const CRON_TOKEN = process.env.REMINDER_CRON_TOKEN || process.env.CRON_SECRET_TOKEN || "";
const DEFAULT_INSTANCE = process.env.EVOLUTION_DEFAULT_INSTANCE || "";

function isAuthorized(req: NextRequest) {
  if (!CRON_TOKEN) return true;
  const header = req.headers.get("authorization") || "";
  const bearer = header.toLowerCase().startsWith("bearer ") ? header.slice(7) : header;
  const tokenParam = new URL(req.url).searchParams.get("token") || "";
  return bearer === CRON_TOKEN || tokenParam === CRON_TOKEN;
}

export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  if (!isAuthorized(req)) {
    return api.unauthorized("Token inválido para cron de lembretes");
  }

  const now = new Date();
  const windowStart = new Date(now.getTime() + 15 * 60 * 1000);
  const windowEnd = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  console.log("[cron-reminder] janela", {
    windowStart: windowStart.toISOString(),
    windowEnd: windowEnd.toISOString(),
  });

  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: { gte: windowStart, lt: windowEnd },
      status: { in: ["PENDING", "CONFIRMED"] },
      reminderSentAt: { equals: null },
      client: { phone: { not: null } },
    },
    include: {
      client: true,
      service: { select: { name: true } },
      professional: { select: { name: true } },
      company: {
        select: {
          nomeFantasia: true,
          contrato: true,
          trialEndsAt: true,
          uazapiInstanceName: true,
          uazapiConnected: true,
          subscription: { select: { plan: true, status: true } },
        },
      },
    },
    take: DEFAULT_BATCH_SIZE,
  });

  const allowedStatuses = new Set(["ACTIVE", "TRIALING"]);
  const nowForTrial = new Date();

  const filteredAppointments = appointments.filter((a) => {
    const s = a.company?.subscription?.status;
    const trialEndsAt = a.company?.trialEndsAt;
    return (
      (s && allowedStatuses.has(String(s).toUpperCase())) ||
      (trialEndsAt && new Date(trialEndsAt) > nowForTrial)
    );
  });

  let sent = 0;
  const skipped: Array<{ id: string; reason: string }> = [];
  const failed: Array<{ id: string; error: string }> = [];

  for (const appt of filteredAppointments) {
    const planName = (appt.company?.subscription?.plan || appt.company?.contrato) as PlanName | undefined;
    const plan = planName ? PLANS[planName] : undefined;

    if (plan && !plan.features.whatsapp) {
      skipped.push({ id: appt.id, reason: "Plano não permite WhatsApp" });
      continue;
    }

    const normalizedPhone = normalizePhone(appt.client?.phone || "");
    if (!normalizedPhone) {
      skipped.push({ id: appt.id, reason: "Telefone ausente ou inválido" });
      continue;
    }

    // Resolver instância: empresa própria > fallback global
    const instanceName =
      (appt.company?.uazapiConnected && appt.company?.uazapiInstanceName)
        ? appt.company.uazapiInstanceName
        : DEFAULT_INSTANCE || null;

    if (!instanceName) {
      skipped.push({ id: appt.id, reason: "Instância WhatsApp não configurada" });
      continue;
    }

    const dateText = format(toBrazilTime(appt.startTime), "dd/MM/yyyy", { locale: ptBR });
    const timeText = format(toBrazilTime(appt.startTime), "HH:mm", { locale: ptBR });
    const serviceName = appt.service?.name || "seu atendimento";
    const professionalName = appt.professional?.name || "nossa equipe";
    const companyName = appt.company?.nomeFantasia || "TôLivre";
    const clientName = appt.clientName || appt.client?.name || "cliente";

    const messageText =
      `Olá *${clientName}*!\n\n` +
      `Este é um lembrete do seu agendamento:\n\n` +
      `📅 *Data/Hora:* ${dateText}, ${timeText}\n` +
      `💼 *Serviço:* ${serviceName}\n` +
      `👤 *Profissional:* ${professionalName}\n` +
      `🏢 *Local:* ${companyName}\n\n` +
      `O que deseja fazer?`;

    const buttons: Array<{ id: string; text: string }> = [];
    if (appt.status === "CONFIRMED") {
      buttons.push({ id: `reschedule_${appt.id}`, text: "📅 Reagendar" });
      buttons.push({ id: `cancel_${appt.id}`, text: "❌ Cancelar" });
    } else {
      buttons.push({ id: `confirm_${appt.id}`, text: "✅ Confirmar" });
      buttons.push({ id: `reschedule_${appt.id}`, text: "📅 Reagendar" });
      buttons.push({ id: `cancel_${appt.id}`, text: "❌ Cancelar" });
    }

    try {
      const res = await evolution.sendButtons({
        instanceName,
        to: normalizedPhone,
        title: "TôLivre - Lembrete",
        body: messageText,
        footer: companyName,
        buttons,
      });

      if (res.ok) {
        await prisma.appointment.updateMany({
          where: { id: appt.id, reminderSentAt: null },
          data: { reminderSentAt: new Date() },
        });
        sent += 1;
        console.log("[cron-reminder] enviado", appt.id, "via", instanceName);
      } else {
        const errMsg = (res as { error?: string }).error || `HTTP ${(res as { status?: number }).status ?? "?"}`;
        failed.push({ id: appt.id, error: errMsg });
      }
    } catch (err) {
      failed.push({ id: appt.id, error: String(err) });
    }
  }

  console.log("[cron-reminder] summary", { total: filteredAppointments.length, sent, skipped: skipped.length, failed: failed.length });

  return api.ok({
    now: now.toISOString(),
    windowStart: windowStart.toISOString(),
    windowEnd: windowEnd.toISOString(),
    total: filteredAppointments.length,
    sent,
    skipped,
    failed,
  });
}
