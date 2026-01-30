import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import sendWhatsAppMessage from "@/lib/uazapi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { checkAppointmentLimit } from "@/lib/subscriptionLimits";
import { emitAppointmentCreated, emitNotification } from "@/lib/websocketEmit";

export const runtime = "nodejs";

const publicAppointmentSchema = z.object({
  companyId: z.string().cuid(),
  professionalId: z.string().cuid(),
  serviceId: z.string().cuid(),
  clientName: z.string().min(1).max(200),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().min(8).max(20).optional(),
  startTime: z.string().datetime(),
});

// POST - Criar agendamento público (sem autenticação)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = publicAppointmentSchema.parse(body);

    // Verificar se o profissional existe e pertence à empresa
    const professional = await prisma.user.findFirst({
      where: {
        id: parsed.professionalId,
        companyId: parsed.companyId,
      },
      include: {
        company: true,
      },
    });

    if (!professional) {
      return api.badRequest("Profissional não encontrado");
    }

    // Verificar se o serviço existe e pertence à empresa
    const service = await prisma.service.findFirst({
      where: {
        id: parsed.serviceId,
        companyId: parsed.companyId,
      },
    });

    if (!service) {
      return api.badRequest("Serviço não encontrado");
    }

    // Calcular endTime
    const startTime = new Date(parsed.startTime);
    const endTime = new Date(startTime.getTime() + service.duration * 60000);

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

    // Verificar se já existe agendamento neste horário (usando advisory lock)
    const result = await prisma.$transaction(async (tx) => {
      // Usar advisory lock para prevenir conflitos
      const { hashToTwoInts } = await import("@/app/libs/hash");
      const [lock1, lock2] = hashToTwoInts(parsed.professionalId);
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(${lock1}::int, ${lock2}::int)`;

      // Verificar conflitos
      const conflict = await tx.appointment.findFirst({
        where: {
          professionalId: parsed.professionalId,
          status: { not: "CANCELED" },
          OR: [
            {
              AND: [
                { startTime: { lte: startTime } },
                { endTime: { gt: startTime } },
              ],
            },
            {
              AND: [
                { startTime: { lt: endTime } },
                { endTime: { gte: endTime } },
              ],
            },
            {
              AND: [
                { startTime: { gte: startTime } },
                { endTime: { lte: endTime } },
              ],
            },
          ],
        },
      });

      if (conflict) {
        throw new Error("CONFLICT");
      }

      // Buscar ou criar cliente (por telefone ou email)
      let client = null;

      // Priorizar busca por telefone se fornecido
      if (parsed.clientPhone) {
        // Normalizar telefone para busca (remover caracteres especiais)
        const normalizedPhone = parsed.clientPhone.replace(/\D/g, "");

        client = await tx.client.findFirst({
          where: {
            companyId: parsed.companyId,
            phone: {
              contains: normalizedPhone.slice(-9), // Últimos 9 dígitos (sem DDD/DDI)
            },
          },
        });
      }

      // Se não encontrou por telefone, tentar por email
      if (!client && parsed.clientEmail) {
        client = await tx.client.findFirst({
          where: {
            companyId: parsed.companyId,
            email: parsed.clientEmail,
          },
        });
      }

      // Se não encontrou, criar novo cliente
      if (!client) {
        client = await tx.client.create({
          data: {
            companyId: parsed.companyId,
            name: parsed.clientName,
            email: parsed.clientEmail || null,
            phone: parsed.clientPhone || null,
          },
        });
      }

      // Criar agendamento
      const appointment = await tx.appointment.create({
        data: {
          companyId: parsed.companyId,
          professionalId: parsed.professionalId,
          clientId: client.id,
          clientName: parsed.clientName,
          serviceId: parsed.serviceId,
          price: service.price,
          startTime,
          endTime,
          status: "PENDING",
        },
        include: {
          service: true,
          professional: true,
          client: true,
        },
      });

      return appointment;
    });

    // Enviar notificação em tempo real para profissionais da empresa
    emitAppointmentCreated(result.companyId, {
      id: result.id,
      clientName: result.clientName,
      serviceName: result.service.name,
      professionalName: result.professional.name,
      startTime: result.startTime.toISOString(),
      action: "created",
    });

    // Enviar notificação via WhatsApp com menu interativo (background, não bloqueia resposta)
    if (parsed.clientPhone) {
      const formattedDate = format(startTime, "dd/MM/yyyy", { locale: ptBR });
      const formattedTime = format(startTime, "HH:mm", { locale: ptBR });

      const messageText =
        `Olá *${parsed.clientName}*!\n\n` +
        `Recebemos sua solicitação de agendamento:\n\n` +
        `📅 *Data:* ${formattedDate}\n` +
        `⏰ *Horário:* ${formattedTime}\n` +
        `💼 *Serviço:* ${service.name}\n` +
        `👤 *Profissional:* ${professional.name}\n` +
        `🏢 *Local:* ${professional.company?.nomeFantasia || "ToLivre"}\n\n` +
        `Por favor, confirme seu agendamento:`;

      // Normalizar telefone
      let phone = parsed.clientPhone.replace(/\D/g, "");
      if (!phone.startsWith("55")) {
        phone = "55" + phone;
      }

      sendWhatsAppMessage
        .sendMenu({
          to: phone,
          text: messageText,
          choices: [
            `✅ Confirmar|confirm_${result.id}`,
            `❌ Cancelar|cancel_${result.id}`,
          ],
          footerText: "ToLivre - Sistema de Agendamentos",
        })
        .catch((err) => {
          console.error("[uazapi] Failed to send booking menu:", err);
        });
    }

    return api.created(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }

    if (err instanceof Error && err.message === "CONFLICT") {
      return api.badRequest(
        "Este horário não está mais disponível. Por favor, escolha outro.",
      );
    }

    console.error("[POST /api/appointments/public] Error:", err);
    return api.serverError("Erro ao criar agendamento");
  }
}
