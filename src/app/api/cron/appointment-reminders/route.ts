import { NextRequest } from "next/server";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import sendWhatsAppMessage, { normalizePhone } from "@/lib/uazapi";
import { PLANS, type PlanName } from "@/lib/subscriptionLimits";

const DEFAULT_HOURS_BEFORE = Number(
  process.env.APPOINTMENT_REMINDER_HOURS_BEFORE || "3",
);
const DEFAULT_WINDOW_MINUTES = Number(
  process.env.APPOINTMENT_REMINDER_WINDOW_MINUTES || "30",
);
const DEFAULT_BATCH_SIZE = Number(
  process.env.APPOINTMENT_REMINDER_BATCH_SIZE || "50",
);
const CRON_TOKEN =
  process.env.REMINDER_CRON_TOKEN || process.env.CRON_SECRET_TOKEN || "";

function isAuthorized(req: NextRequest) {
  if (!CRON_TOKEN) return true; // allow in dev if token not set
  const header = req.headers.get("authorization") || "";
  const bearer = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7)
    : header;
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
    console.log("[cron-reminder] unauthorized request");
    return api.unauthorized("Token inválido para cron de lembretes");
  }

  const hoursBefore = DEFAULT_HOURS_BEFORE;
  const windowMinutes = DEFAULT_WINDOW_MINUTES;
  const batchSize = DEFAULT_BATCH_SIZE;

  // Brasil timezone offset: UTC-3 (3 horas a menos que UTC)
  const BRAZIL_OFFSET_MS = -3 * 60 * 60 * 1000;
  
  const now = new Date();
  // Ajustar a janela de busca para timezone do Brasil
  // Se agora é 11:00 UTC (8:00 BRT), queremos buscar appointments entre 11:00 BRT e 11:30 BRT
  // que no banco estão armazenados como 14:00 UTC a 14:30 UTC (se foram salvos como horário local sem conversão)
  // Mas se foram salvos corretamente em UTC, então 11:00 BRT seria 14:00 UTC
  // Portanto, precisamos buscar appointments que estão armazenados no horário local do Brasil
  const nowBrazil = new Date(now.getTime() + BRAZIL_OFFSET_MS);
  const windowStart = new Date(nowBrazil.getTime() + hoursBefore * 60 * 60 * 1000);
  const windowEnd = new Date(windowStart.getTime() + windowMinutes * 60 * 1000);

  console.log("[cron-reminder] params", {
    hoursBefore,
    windowMinutes,
    batchSize,
  });
  console.log("[cron-reminder] now/windowStart/windowEnd", {
    nowUTC: now.toISOString(),
    nowBrazil: nowBrazil.toISOString(),
    windowStart: windowStart.toISOString(),
    windowEnd: windowEnd.toISOString(),
  });
  // Use Prisma to fetch candidate appointments within the UTC window.
  // Timezone normalization (if needed) will be handled in JS after fetching.
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
          subscription: { select: { plan: true, status: true } },
        },
      },
    },
    take: batchSize,
  });

  console.log("[cron-reminder] fetched appointments", appointments.length);
  if (appointments.length > 0) {
    console.log(
      "[cron-reminder] sample fetched ids",
      appointments
        .slice(0, 10)
        .map((a) => ({ id: a.id, startTime: a.startTime?.toISOString() })),
    );
  }

  // Filter appointments by subscription status (case-insensitive) in JS to avoid
  // TypeScript/Prisma enum literal mismatches during build.
  const allowedStatuses = new Set(["ACTIVE", "TRIALING"]);
  const filteredAppointments = appointments.filter((a) => {
    const s = a.company?.subscription?.status;
    console.log('[cron-reminder] filtering appointment', { 
      id: a.id, 
      hasCompany: !!a.company, 
      hasSubscription: !!a.company?.subscription, 
      status: s,
      statusUpper: s ? String(s).toUpperCase() : null,
      allowed: s ? allowedStatuses.has(String(s).toUpperCase()) : false
    });
    if (!s) return false;
    const st = String(s).toUpperCase();
    return allowedStatuses.has(st);
  });

  console.log(
    "[cron-reminder] after subscription filter",
    filteredAppointments.length,
    "appointments",
  );
  if (filteredAppointments.length > 0) {
    console.log(
      "[cron-reminder] sample filtered ids",
      filteredAppointments
        .slice(0, 10)
        .map((a) => ({
          id: a.id,
          startTime: a.startTime?.toISOString(),
          subscription: a.company?.subscription?.status,
        })),
    );
  }

  // If debug mode is requested (query param ?debug=1), return the matching appointments
  try {
    const urlObj = new URL(req.url);
    const debugMode = urlObj.searchParams.get("debug") === "1";
    if (debugMode) {
      const debugList = filteredAppointments.map((a) => ({
        id: a.id,
        startTime: a.startTime,
        status: a.status,
        reminderSentAt: a.reminderSentAt,
        companyId: a.companyId,
        clientPhone: a.client?.phone
          ? a.client.phone.replace(/[\x00-\x1F\x7F]/g, "")
          : null,
      }));
      console.log("[cron-reminder] debug response prepared", debugList.length);
      return api.ok({
        now: now.toISOString(),
        windowStart: windowStart.toISOString(),
        windowEnd: windowEnd.toISOString(),
        total: filteredAppointments.length,
        appointments: debugList,
      });
    }
  } catch (e) {
    // ignore debug failures
  }

  let sent = 0;
  const skipped: Array<{ id: string; reason: string }> = [];
  const failed: Array<{ id: string; error: string }> = [];
  for (const appt of filteredAppointments) {
    console.log("[cron-reminder] processing appointment", {
      id: appt.id,
      startTime: appt.startTime?.toISOString(),
      companyId: appt.companyId,
    });
    const planFromSub = appt.company?.subscription?.plan as
      | PlanName
      | undefined;
    const planName: PlanName | undefined =
      planFromSub || (appt.company?.contrato as PlanName | undefined);
    const plan = planName ? PLANS[planName] : undefined;

    if (plan && !plan.features.whatsapp) {
      skipped.push({ id: appt.id, reason: "Plano não permite WhatsApp" });
      continue;
    }

    const phoneRaw = appt.client?.phone || "";
    const normalizedPhone = normalizePhone(phoneRaw);
    if (!normalizedPhone) {
      skipped.push({ id: appt.id, reason: "Telefone ausente ou inválido" });
      continue;
    }

    const dateText = format(appt.startTime, "dd/MM/yyyy", { locale: ptBR });
    const timeText = format(appt.startTime, "HH:mm", { locale: ptBR });
    const serviceName = appt.service?.name || "seu atendimento";
    const professionalName = appt.professional?.name || "nossa equipe";
    const companyName = appt.company?.nomeFantasia || "TôLivre";
    const clientName = appt.clientName || appt.client?.name || "cliente";

    const message =
      `⏰ *Lembrete de compromisso*\n\n` +
      `Olá ${clientName}! Este é um lembrete do seu agendamento em ${companyName}.\n\n` +
      `📅 Data: ${dateText}\n` +
      `⏰ Horário: ${timeText}\n` +
      `💼 Serviço: ${serviceName}\n` +
      `👤 Profissional: ${professionalName}\n\n` +
      `Se precisar reagendar ou cancelar, responda esta mensagem.`;

    try {
      const res = await sendWhatsAppMessage.sendText({
        to: normalizedPhone,
        message,
      });

      if (res.ok) {
        await prisma.appointment.updateMany({
          where: { id: appt.id, reminderSentAt: null },
          data: { reminderSentAt: new Date() },
        });
        sent += 1;
        console.log("[cron-reminder] sent", { id: appt.id });
      } else {
        const errMsg =
          (res as any).error || `HTTP ${(res as any).status ?? "unknown"}`;
        failed.push({ id: appt.id, error: errMsg });
        console.log("[cron-reminder] send-failed", {
          id: appt.id,
          error: errMsg,
        });
      }
    } catch (err) {
      const errStr = String(err);
      failed.push({ id: appt.id, error: errStr });
      console.log("[cron-reminder] send-exception", {
        id: appt.id,
        error: errStr,
      });
    }
  }

  console.log("[cron-reminder] summary", {
    total: filteredAppointments.length,
    sent,
    skipped: skipped.length,
    failed: failed.length,
  });

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
