// app/api/appointments/route.ts (Next.js app router style)
import { NextRequest } from "next/server";
import { z, ZodError } from "zod";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";

// Request validation
const createAppointmentSchema = z.object({
  companyId: z.string().min(1),
  professionalId: z.string().min(1),
  clientName: z.string().min(1),
  serviceId: z.string().min(1),
  startTime: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: "startTime deve ser uma ISO date válida",
  }),
});

function timeToMinutes(hhmm: string) {
  const [hh, mm] = hhmm.split(":").map(Number);
  return hh * 60 + mm;
}

function getDayOfWeekUTC(date: Date) {
  return date.getUTCDay(); // 0..6
}

// Converter UTC para horário do Brasil (UTC-3)
function getBrazilTime(utcDate: Date) {
  const BRAZIL_OFFSET_MS = -3 * 60 * 60 * 1000;
  return new Date(utcDate.getTime() + BRAZIL_OFFSET_MS);
}

// Simple hash to two 32-bit ints for advisory lock
function hashToTwoInts(key: string): [number, number] {
  let h = 5381;
  for (let i = 0; i < key.length; i++) h = (h * 33) ^ key.charCodeAt(i);
  // convert to signed 32-bit integers to match Postgres `int` parameters
  const a = h | 0;
  const b = ~h | 0;
  return [a, b];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createAppointmentSchema.parse(body);
    const start = new Date(parsed.startTime);
    const companyId = parsed.companyId;
    const professionalId = parsed.professionalId;
    const serviceId = parsed.serviceId;

    // fetch service and its duration (and ensure it belongs to company)
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { id: true, duration: true, companyId: true, name: true },
    });
    if (!service || service.companyId !== companyId) {
      return api.badRequest("Serviço não encontrado ou não pertence à empresa");
    }

    // compute endTime
    const end = new Date(start.getTime() + service.duration * 60_000);

    // working hours for that company and day - usar horário do Brasil
    const startBrazil = getBrazilTime(start);
    const endBrazil = getBrazilTime(end);
    const day = startBrazil.getDay(); // Usar dia do Brasil, não UTC

    const wh = await prisma.workingHours.findFirst({
      where: { companyId, dayOfWeek: day },
    });
    if (!wh)
      return api.badRequest(
        "Horário de funcionamento não configurado para esse dia",
      );

    // convert start/end to minutes (Brazil time-of-day)
    // IMPORTANTE: usar getUTCHours() porque startBrazil/endBrazil já foram ajustados
    const startMinutes = startBrazil.getUTCHours() * 60 + startBrazil.getUTCMinutes();
    const endMinutes = endBrazil.getUTCHours() * 60 + endBrazil.getUTCMinutes();
    const openMinutes = timeToMinutes(wh.openTime);
    const closeMinutes = timeToMinutes(wh.closeTime);

    if (startMinutes < openMinutes || endMinutes > closeMinutes)
      return api.badRequest("Agendamento fora do horário de funcionamento");

    // Use advisory lock per professional to avoid race conditions in concurrent requests
    const [lock1, lock2] = hashToTwoInts(professionalId);

    const created = await prisma.$transaction(async (tx) => {
      // acquire pg advisory lock for this professional (transactional)
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(${lock1}::int, ${lock2}::int)`;

      // check overlaps: any appointment for same professional where NOT (existing.end <= new.start OR existing.start >= new.end)
      const overlapCount = await tx.appointment.count({
        where: {
          professionalId,
          AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
          // optionally consider status only for PENDING/CONFIRMED etc.
        },
      });

      if (overlapCount > 0) {
        throw new Error(
          "Já existe agendamento conflitando para esse profissional nesse horário",
        );
      }

      // create appointment (calculate price? could copy service.price)
      const appt = await tx.appointment.create({
        data: {
          companyId,
          professionalId,
          clientName: parsed.clientName,
          serviceId,
          price: undefined, // optionally copy service price
          startTime: start,
          endTime: end,
        },
      });

      return appt;
    });

    return api.created(created);
  } catch (err) {
    if (err instanceof ZodError) {
      const errorDetails = err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return api.badRequest("Erro de validação", errorDetails);
    }

    const error = err as Error;
    return api.serverError(error.message || "Erro ao criar agendamento");
  }
}
// PATCH - Atualizar status do agendamento
const updateStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELED"]),
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
    const { status } = updateStatusSchema.parse(body);

    // Busca o agendamento
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      select: { companyId: true },
    });

    if (!appointment) {
      return api.notFound("Agendamento não encontrado");
    }

    // Verifica se o usuário tem permissão
    if (user.companyId && user.companyId !== appointment.companyId) {
      return api.forbidden("Sem permissão para editar este agendamento");
    }

    // Atualiza o status
    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: {
        service: true,
        professional: true,
        client: true,
      },
    });

    return api.ok(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      return api.badRequest("Status inválido", err.issues);
    }

    const error = err as Error;
    return api.serverError(error.message || "Erro ao atualizar status");
  }
}
