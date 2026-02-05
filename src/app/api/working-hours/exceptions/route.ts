import { NextRequest } from "next/server";
import { z } from "zod";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import prisma from "@/lib/prisma";
import { checkFeatureAccess } from "@/app/libs/planGuard";

const ExceptionSchema = z.object({
  professionalId: z.string().optional(),
  date: z.string(), // ISO date string
  type: z.enum(["BLOCKED", "CUSTOM", "HOLIDAY"]),
  reason: z.string().optional(),
  openTime: z.string().optional(), // HH:mm
  closeTime: z.string().optional(), // HH:mm
});

const ExceptionUpdateSchema = ExceptionSchema.partial();

// GET - Listar exceções
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user?.companyId) return api.unauthorized();

    const { searchParams } = new URL(req.url);
    const professionalId = searchParams.get("professionalId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {
      companyId: user.companyId,
    };

    if (professionalId) {
      where.OR = [
        { professionalId },
        { professionalId: null }, // Exceções globais
      ];
    }

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const exceptions = await prisma.workingHourException.findMany({
      where,
      orderBy: { date: "asc" },
    });

    return api.ok(exceptions);
  } catch (err) {
    console.error("Error fetching exceptions:", err);
    return api.serverError("Erro ao buscar exceções");
  }
}

// POST - Criar exceção
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user?.companyId) return api.unauthorized();

    // Verificar se o plano tem acesso a exceções de horário
    const { allowed, planRequired } = await checkFeatureAccess(
      user.companyId,
      "workingHourExceptions"
    );
    if (!allowed) {
      return api.forbidden(
        `Exceções de horário disponíveis apenas a partir do plano ${planRequired}. Faça upgrade para acessar esta funcionalidade.`
      );
    }

    const body = await req.json();
    const parsed = ExceptionSchema.parse(body);

    // Validar CUSTOM precisa de horários
    if (parsed.type === "CUSTOM") {
      if (!parsed.openTime || !parsed.closeTime) {
        return api.badRequest("Tipo CUSTOM requer openTime e closeTime");
      }
    }

    // Verificar se profissional pertence à empresa
    if (parsed.professionalId) {
      const professional = await prisma.user.findUnique({
        where: { id: parsed.professionalId },
        select: { companyId: true },
      });

      if (!professional || professional.companyId !== user.companyId) {
        return api.forbidden("Profissional não pertence à sua empresa");
      }
    }

    const exception = await prisma.workingHourException.create({
      data: {
        companyId: user.companyId,
        professionalId: parsed.professionalId,
        date: new Date(parsed.date),
        type: parsed.type,
        reason: parsed.reason,
        openTime: parsed.openTime,
        closeTime: parsed.closeTime,
      },
    });

    return api.created(exception);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("Error creating exception:", err);
    return api.serverError("Erro ao criar exceção");
  }
}
