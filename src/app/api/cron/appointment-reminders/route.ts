import { NextRequest } from "next/server";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import sendWhatsAppMessage, { normalizePhone, toBrazilTime } from "@/lib/uazapi";
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
  // Calcular janela de busca: agora + hoursBefore (em UTC)
  // Appointments são salvos em UTC (convertidos do horário local do browser pelo .toISOString())
  // Se agora é 20:31 Brasil (23:31 UTC), queremos appointments que começam em 23:31 Brasil (02:31 UTC)
  // Ou seja: windowStart = now + hoursBefore
  const windowStart = new Date(now.getTime() + hoursBefore * 60 * 60 * 1000);
  const windowEnd = new Date(windowStart.getTime() + windowMinutes * 60 * 1000);
  
  // Calcular nowBrazil apenas para exibir nos logs
  const nowBrazil = new Date(now.getTime() + BRAZIL_OFFSET_MS);

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
          trialEndsAt: true,
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

  // Filter appointments by subscription status or trial status
  // Accept if:
  // 1. Company has subscription with status ACTIVE or TRIALING
  // 2. Company is in trial period (trialEndsAt > now)
  const allowedStatuses = new Set(["ACTIVE", "TRIALING"]);
  const nowForTrial = new Date();
  const filteredAppointments = appointments.filter((a) => {
    const s = a.company?.subscription?.status;
    const trialEndsAt = a.company?.trialEndsAt;
    const isInTrial = trialEndsAt && new Date(trialEndsAt) > nowForTrial;
    const hasActiveSubscription =
      s && allowedStatuses.has(String(s).toUpperCase());

    console.log("[cron-reminder] filtering appointment", {
      id: a.id,
      hasCompany: !!a.company,
      hasSubscription: !!a.company?.subscription,
      status: s,
      trialEndsAt: trialEndsAt?.toISOString(),
      isInTrial,
      hasActiveSubscription,
      allowed: hasActiveSubscription || isInTrial,
    });

    return hasActiveSubscription || isInTrial;
  });

  console.log(
    "[cron-reminder] after subscription filter",
    filteredAppointments.length,
    "appointments",
  );
  if (filteredAppointments.length > 0) {
    console.log(
      "[cron-reminder] sample filtered ids",
      filteredAppointments.slice(0, 10).map((a) => ({
        id: a.id,
        startTime: a.startTime?.toISOString(),
        subscription: a.company?.subscription?.status,
      })),
    );
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

    // Botões dinâmicos baseados no status
    const choices: string[] = [];
    if (appt.status === "CONFIRMED") {
      // Já confirmado: apenas reagendar ou cancelar
      choices.push(`📅 Reagendar|reschedule_${appt.id}`);
      choices.push(`❌ Cancelar|cancel_${appt.id}`);
    } else {
      // Não confirmado: confirmar, reagendar ou cancelar
      choices.push(`✅ Confirmar|confirm_${appt.id}`);
      choices.push(`📅 Reagendar|reschedule_${appt.id}`);
      choices.push(`❌ Cancelar|cancel_${appt.id}`);
    }

    try {
      const res = await sendWhatsAppMessage.sendMenu({
        to: normalizedPhone,
        text: messageText,
        choices,
        footerText: "ToLivre - Sistema de Agendamentos",
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
