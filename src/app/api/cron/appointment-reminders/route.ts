import { NextRequest } from "next/server";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import sendWhatsAppMessage from "@/lib/uazapi";
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
    return api.unauthorized("Token inválido para cron de lembretes");
  }

  const hoursBefore = DEFAULT_HOURS_BEFORE;
  const windowMinutes = DEFAULT_WINDOW_MINUTES;
  const batchSize = DEFAULT_BATCH_SIZE;

  const now = new Date();
  const windowStart = new Date(now.getTime() + hoursBefore * 60 * 60 * 1000);
  const windowEnd = new Date(windowStart.getTime() + windowMinutes * 60 * 1000);

  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: {
        gte: windowStart,
        lt: windowEnd,
      },
      status: { in: ["PENDING", "CONFIRMED"] },
      reminderSentAt: { equals: null },
      client: {
        phone: { not: null },
      },
      company: {
        subscription: {
          // allow ACTIVE or TRIALING (accept common lowercase variants too)
          is: { status: { in: ["ACTIVE", "TRIALING", "active", "trial"] } },
        },
      },
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

  // If debug mode is requested (query param ?debug=1), return the matching appointments
  try {
    const urlObj = new URL(req.url);
    const debugMode = urlObj.searchParams.get("debug") === "1";
    if (debugMode) {
      const debugList = appointments.map((a) => ({
        id: a.id,
        startTime: a.startTime,
        status: a.status,
        reminderSentAt: a.reminderSentAt,
        companyId: a.companyId,
        clientPhone: a.client?.phone || null,
      }));
      return api.ok({
        windowStart,
        windowEnd,
        total: appointments.length,
        appointments: debugList,
      });
    }
  } catch (e) {
    // ignore debug failures
  }

  let sent = 0;
  const skipped: Array<{ id: string; reason: string }> = [];
  const failed: Array<{ id: string; error: string }> = [];

  for (const appt of appointments) {
    const planFromSub = appt.company.subscription?.plan as PlanName | undefined;
    const planName: PlanName | undefined =
      planFromSub || (appt.company.contrato as PlanName | undefined);
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
      } else {
        failed.push({
          id: appt.id,
          error: res.error || `HTTP ${res.status ?? "unknown"}`,
        });
      }
    } catch (err) {
      failed.push({ id: appt.id, error: String(err) });
    }
  }

  return api.ok({
    windowStart,
    windowEnd,
    total: appointments.length,
    sent,
    skipped,
    failed,
  });
}

function normalizePhone(phone?: string) {
  if (!phone) return null;
  let d = String(phone).replace(/\D/g, "");
  if (!d) return null;
  if (!d.startsWith("55") && d.length <= 11) {
    d = `55${d}`;
  }
  return d;
}
