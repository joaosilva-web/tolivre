import { NextRequest } from "next/server";
import { z, ZodError } from "zod";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";
import { buildAppointmentWhere } from "@/lib/appointmentsRange";
import { toBrazilTime } from "@/lib/uazapi";
import * as api from "@/app/libs/apiResponse";
import { checkRateLimit } from "@/app/libs/rateLimit";
import { getUserFromCookie } from "@/app/libs/auth";
import { sendText as sendUazText, sendMenu as sendUazMenu } from "@/lib/uazapi";
import { checkAppointmentLimit } from "@/lib/subscriptionLimits";
import {
  emitAppointmentCreated,
  emitAppointmentUpdated,
  emitAppointmentCanceled,
} from "@/lib/websocketEmit";

export const runtime = "nodejs";

// local helper error type for errors with codes (e.g. OVERLAP)
type ErrorWithCode = Error & { code?: string };

// Schemas
const createAppointmentSchema = z.object({
  companyId: z.string().min(1),
  professionalId: z.string().min(1),
  clientName: z.string().min(1).optional(),
  clientId: z.string().optional(),
  serviceId: z.string().min(1),
  startTime: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: "startTime deve ser uma ISO date válida",
  }),
});

const updateAppointmentSchema = z.object({
  startTime: z
    .string()
    .optional()
    .refine((s) => !s || !Number.isNaN(Date.parse(s)), {
      message: "startTime deve ser uma ISO date válida",
    }),
  serviceId: z.string().optional(),
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELED"]).optional(),
});

function timeToMinutes(hhmm: string) {
  const [hh, mm] = hhmm.split(":").map(Number);
  return hh * 60 + mm;
}

function getDayOfWeekUTC(date: Date) {
  return date.getUTCDay();
}

// Converter UTC para horário do Brasil (UTC-3)
function getBrazilTime(utcDate: Date) {
  const BRAZIL_OFFSET_MS = -3 * 60 * 60 * 1000;
  return new Date(utcDate.getTime() + BRAZIL_OFFSET_MS);
}

function hashToTwoInts(key: string): [number, number] {
  let h = 5381;
  for (let i = 0; i < key.length; i++) h = (h * 33) ^ key.charCodeAt(i);
  const a = h | 0;
  const b = ~h | 0;
  return [a, b];
}

// POST - criar appointment
export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // If the request comes from an authenticated user, skip rate limiting
    const user = await getUserFromCookie();
    const allowed = await checkRateLimit(ip, { userId: user?.id ?? null });
    if (!allowed) return api.tooMany();

    const body = await req.json();
    const parsed = createAppointmentSchema.parse(body);
    const start = new Date(parsed.startTime);

    const service = await prisma.service.findUnique({
      where: { id: parsed.serviceId },
      select: { id: true, duration: true, companyId: true },
    });

    if (!service || service.companyId !== parsed.companyId)
      return api.badRequest("Serviço não encontrado ou não pertence à empresa");

    const end = new Date(start.getTime() + service.duration * 60_000);

    // Check subscription limits
    const subscription = await prisma.subscription.findUnique({
      where: { companyId: parsed.companyId },
    });

    const appointmentsThisMonth = await prisma.appointment.count({
      where: {
        companyId: parsed.companyId,
        startTime: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });

    const limitCheck = checkAppointmentLimit(
      subscription,
      appointmentsThisMonth,
    );
    if (!limitCheck.allowed) {
      return api.forbidden(
        limitCheck.message || "Limite de agendamentos atingido",
      );
    }

    // Working hours - converter para horário do Brasil antes de validar
    const startBrazil = getBrazilTime(start);
    const endBrazil = getBrazilTime(end);
    const day = startBrazil.getDay(); // Usar dia do Brasil, não UTC

    console.log("🔍 [WORKING HOURS VALIDATION]", {
      startUTC: start.toISOString(),
      startBrazil: startBrazil.toISOString(),
      startBrazilLocal: startBrazil.toString(),
      endUTC: end.toISOString(),
      endBrazil: endBrazil.toISOString(),
      dayOfWeek: day,
      dayName: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][day]
    });

    const wh = await prisma.workingHours.findFirst({
      where: { companyId: parsed.companyId, dayOfWeek: day },
    });
    if (!wh) {
      console.log("❌ [WORKING HOURS] Horário de funcionamento não encontrado para dia", day);
      return api.badRequest(
        "Horário de funcionamento não configurado para esse dia",
      );
    }

    console.log("🔍 [WORKING HOURS FOUND]", {
      openTime: wh.openTime,
      closeTime: wh.closeTime,
      openMinutes: timeToMinutes(wh.openTime),
      closeMinutes: timeToMinutes(wh.closeTime)
    });

    const startMinutes = startBrazil.getHours() * 60 + startBrazil.getMinutes();
    const endMinutes = endBrazil.getHours() * 60 + endBrazil.getMinutes();
    
    console.log("🔍 [TIME COMPARISON]", {
      startMinutes,
      endMinutes,
      isStartBeforeOpen: startMinutes < timeToMinutes(wh.openTime),
      isEndAfterClose: endMinutes > timeToMinutes(wh.closeTime),
      willFail: startMinutes < timeToMinutes(wh.openTime) || endMinutes > timeToMinutes(wh.closeTime)
    });
    
    if (
      startMinutes < timeToMinutes(wh.openTime) ||
      endMinutes > timeToMinutes(wh.closeTime)
    ) {
      console.log("❌ [WORKING HOURS] Agendamento fora do horário permitido");
      return api.badRequest("Agendamento fora do horário de funcionamento");
    }
    
    console.log("✅ [WORKING HOURS] Validação passou");

    const [lock1, lock2] = hashToTwoInts(parsed.professionalId);

    const created = await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(${lock1}::int, ${lock2}::int)`;

      // resolve clientName from clientId if provided
      let clientNameToStore = parsed.clientName ?? "";
      if (parsed.clientId) {
        const c = await tx.client.findUnique({
          where: { id: parsed.clientId },
        });
        if (!c || c.companyId !== parsed.companyId) {
          throw new Error("Cliente inválido");
        }
        clientNameToStore = c.name;
      }

      const overlapCount = await tx.appointment.count({
        where: {
          professionalId: parsed.professionalId,
          AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
        },
      });

      if (overlapCount > 0) {
        const e = new Error(
          "Já existe agendamento conflitando para esse profissional nesse horário",
        ) as ErrorWithCode;
        e.code = "OVERLAP";
        throw e;
      }

      // Buscar taxa de comissão do profissional e preço do serviço
      const professional = await tx.user.findUnique({
        where: { id: parsed.professionalId },
        select: { commissionRate: true },
      });

      const serviceWithPrice = await tx.service.findUnique({
        where: { id: parsed.serviceId },
        select: { price: true },
      });

      const price = serviceWithPrice?.price || 0;
      const commissionRate = professional?.commissionRate || 0;
      const commissionAmount = price * (commissionRate / 100);

      return await tx.appointment.create({
        data: {
          companyId: parsed.companyId,
          professionalId: parsed.professionalId,
          clientName: clientNameToStore,
          clientId: parsed.clientId ?? undefined,
          serviceId: parsed.serviceId,
          startTime: start,
          endTime: end,
          price,
          commissionRate,
          commissionAmount,
        },
      });
    });

    // try to send WhatsApp notification in background (non-blocking)
    (async () => {
      try {
        // fetch company phone and name
        const company = await prisma.company.findUnique({
          where: { id: parsed.companyId },
          select: {
            telefone: true,
            nomeFantasia: true,
            uazapiConnected: true,
          },
        });

        // resolve client phone if possible
        let clientPhone: string | undefined;
        let clientNameToUse = parsed.clientName ?? "";
        if (parsed.clientId) {
          const c = await prisma.client.findUnique({
            where: { id: parsed.clientId },
            select: { phone: true, name: true },
          });
          if (c) {
            clientPhone = c.phone ?? undefined;
            clientNameToUse = c.name ?? clientNameToUse;
          }
        }

        // fetch service name
        const svc = await prisma.service.findUnique({
          where: { id: parsed.serviceId },
          select: { name: true },
        });

        if (company?.telefone && clientPhone) {
          const startBrazil = toBrazilTime(start);
          const startLocal = startBrazil.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          });

          const messageText =
            `Olá *${clientNameToUse}*!\n\n` +
            `Recebemos sua solicitação de agendamento:\n\n` +
            `📅 *Data/Hora:* ${startLocal}\n` +
            `💼 *Serviço:* ${svc?.name || "o serviço"}\n` +
            `🏢 *Local:* ${company.nomeFantasia || "ToLivre"}\n\n` +
            `Por favor, confirme seu agendamento:`;

          const result = await sendUazMenu({
            to: clientPhone,
            text: messageText,
            choices: [
              `✅ Confirmar|confirm_${created.id}`,
              `❌ Cancelar|cancel_${created.id}`,
            ],
            footerText: "ToLivre - Sistema de Agendamentos",
          });
          console.log(
            "[appointments] WhatsApp send result for appointment",
            created.id,
            {
              companyId: parsed.companyId,
              clientId: parsed.clientId,
              clientPhone,
              payload: { to: clientPhone, from: company.telefone },
              connected: company.uazapiConnected,
              result,
            },
          );
        } else {
          console.log(
            "[appointments] Skipping WhatsApp: missing company phone or client phone",
            {
              companyPhone: company?.telefone,
              clientPhone,
              connected: company?.uazapiConnected,
              companyId: parsed.companyId,
              clientId: parsed.clientId,
            },
          );
        }
      } catch (err) {
        console.error("Erro ao enviar notificação WhatsApp:", err);
      }
    })();

    // Emit WebSocket notification
    (async () => {
      try {
        const appointment = await prisma.appointment.findUnique({
          where: { id: created.id },
          include: {
            service: { select: { name: true } },
            professional: { select: { name: true } },
          },
        });

        if (appointment) {
          emitAppointmentCreated(parsed.companyId, {
            id: appointment.id,
            clientName: appointment.clientName,
            serviceName: appointment.service.name,
            professionalName: appointment.professional.name,
            startTime: appointment.startTime.toISOString(),
            action: "created",
          });
        }
      } catch (err) {
        console.error("[WebSocket] Failed to emit appointment created:", err);
      }
    })();

    return api.ok(created);
  } catch (err) {
    if (err instanceof ZodError) {
      const errorDetails = err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      }));
      return api.badRequest("Erro de validação", errorDetails);
    }
    const e = err as ErrorWithCode;
    if (e?.code === "OVERLAP") return api.conflict(e.message);
    return api.serverError(
      (err as Error).message || "Erro ao criar agendamento",
    );
  }
}

// GET - listar appointments
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const companyId = searchParams.get("companyId");
    const professionalId = searchParams.get("professionalId");
    const clientId = searchParams.get("clientId");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const fromDatetime = searchParams.get("fromDatetime");
    const status = searchParams.get("status");
    const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");
    const pageSizeParam = searchParams.get("pageSize");

    if (!companyId) return api.badRequest("companyId é obrigatório");

    let where: Prisma.AppointmentWhereInput;
    if (fromDatetime) {
      // allow passing a full ISO datetime to filter appointments starting from that instant
      const dt = new Date(fromDatetime);
      if (isNaN(dt.getTime())) return api.badRequest("fromDatetime inválido");
      where = {
        companyId,
        startTime: { gte: dt },
      } as Prisma.AppointmentWhereInput;
    } else if (from || to) {
      // buildAppointmentWhere returns a plain object but it matches AppointmentWhereInput shape
      where = buildAppointmentWhere(companyId, from ?? "", to ?? "");
    } else {
      where = { companyId };
    }
    if (professionalId) where = { ...where, professionalId };
    if (clientId) where = { ...where, clientId };
    if (status) where = { ...where, status: status as any };

    // support optional pagination
    const page = pageParam ? Math.max(1, Number(pageParam) || 1) : null;
    const pageSize = pageSizeParam
      ? Math.max(1, Number(pageSizeParam) || 10)
      : 10;
    const limit = limitParam ? Math.max(1, Number(limitParam)) : undefined;

    if (page) {
      const total = await prisma.appointment.count({ where });
      const appointments = await prisma.appointment.findMany({
        where,
        include: { service: true, professional: true, client: true },
        orderBy: { startTime: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return api.ok({ data: appointments, total, page, pageSize });
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: { service: true, professional: true, client: true },
      orderBy: { startTime: "asc" },
      ...(limit && { take: limit }),
    });

    return api.ok(appointments);
  } catch (err) {
    return api.serverError(
      (err as Error).message || "Erro ao listar agendamentos",
    );
  }
}

// PUT - atualizar appointment
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return api.badRequest("id é obrigatório");

    const parsed = updateAppointmentSchema.parse(rest);

    const current = await prisma.appointment.findUnique({ where: { id } });
    if (!current) return api.notFound("Agendamento não encontrado");

    const start = parsed.startTime
      ? new Date(parsed.startTime)
      : current.startTime;
    const serviceId = parsed.serviceId || current.serviceId;

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { duration: true, companyId: true },
    });
    if (!service) return api.badRequest("Serviço inválido");

    const end = new Date(start.getTime() + service.duration * 60_000);

    const [lock1, lock2] = hashToTwoInts(current.professionalId);

    const updated = await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(${lock1}::int, ${lock2}::int)`;

      const overlapCount = await tx.appointment.count({
        where: {
          professionalId: current.professionalId,
          id: { not: id },
          AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
        },
      });

      if (overlapCount > 0) throw new Error("Horário em conflito");

      return await tx.appointment.update({
        where: { id },
        data: {
          startTime: start,
          endTime: end,
          serviceId,
          status: parsed.status,
        },
      });
    });

    // Emit WebSocket notification
    (async () => {
      try {
        const appointment = await prisma.appointment.findUnique({
          where: { id: updated.id },
          include: {
            service: { select: { name: true } },
            professional: { select: { name: true } },
          },
        });

        if (appointment) {
          emitAppointmentUpdated(appointment.companyId, {
            id: appointment.id,
            clientName: appointment.clientName,
            serviceName: appointment.service.name,
            professionalName: appointment.professional.name,
            startTime: appointment.startTime.toISOString(),
            action: "updated",
          });
        }
      } catch (err) {
        console.error("[WebSocket] Failed to emit appointment updated:", err);
      }
    })();

    return api.ok(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      const errorDetails = err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      }));
      return api.badRequest("Erro de validação", errorDetails);
    }
    return api.serverError((err as Error).message || "Erro ao atualizar");
  }
}

// DELETE - remover appointment
export async function DELETE(req: NextRequest) {
  try {
    const searchId = req.nextUrl.searchParams.get("id");
    let id: string | null = searchId;

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id ?? null;
      } catch {
        id = null;
      }
    }

    if (!id) return api.badRequest("id é obrigatório");

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        service: { select: { name: true } },
        professional: { select: { name: true } },
      },
    });

    if (!appointment) return api.notFound("Agendamento não encontrado");

    await prisma.appointment.delete({ where: { id } });

    // Emit WebSocket notification
    (async () => {
      try {
        emitAppointmentCanceled(appointment.companyId, {
          id: appointment.id,
          clientName: appointment.clientName,
          serviceName: appointment.service.name,
          professionalName: appointment.professional.name,
          startTime: appointment.startTime.toISOString(),
          action: "canceled",
        });
      } catch (err) {
        console.error("[WebSocket] Failed to emit appointment canceled:", err);
      }
    })();

    return api.ok({ id });
  } catch (err) {
    return api.serverError((err as Error).message || "Erro ao deletar");
  }
}
