import { NextRequest } from "next/server";
import { z } from "zod";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import prisma from "@/lib/prisma";

const ExceptionUpdateSchema = z.object({
  professionalId: z.string().optional(),
  date: z.string().optional(),
  type: z.enum(["BLOCKED", "CUSTOM", "HOLIDAY"]).optional(),
  reason: z.string().optional(),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
});

// GET - Buscar exceção específica
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!user?.companyId) return api.unauthorized();

    const { id } = await params;

    const exception = await prisma.workingHourException.findUnique({
      where: { id },
    });

    if (!exception) {
      return api.notFound("Exceção não encontrada");
    }

    if (exception.companyId !== user.companyId) {
      return api.forbidden("Você não pode acessar esta exceção");
    }

    return api.ok(exception);
  } catch (err) {
    console.error("Error fetching exception:", err);
    return api.serverError("Erro ao buscar exceção");
  }
}

// PATCH - Atualizar exceção
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!user?.companyId) return api.unauthorized();

    const { id } = await params;

    const existing = await prisma.workingHourException.findUnique({
      where: { id },
    });

    if (!existing) {
      return api.notFound("Exceção não encontrada");
    }

    if (existing.companyId !== user.companyId) {
      return api.forbidden("Você não pode editar esta exceção");
    }

    const body = await req.json();
    const parsed = ExceptionUpdateSchema.parse(body);

    // Validar CUSTOM precisa de horários
    if (parsed.type === "CUSTOM" || existing.type === "CUSTOM") {
      const finalOpenTime = parsed.openTime ?? existing.openTime;
      const finalCloseTime = parsed.closeTime ?? existing.closeTime;
      
      if (!finalOpenTime || !finalCloseTime) {
        return api.badRequest("Tipo CUSTOM requer openTime e closeTime");
      }
    }

    const updated = await prisma.workingHourException.update({
      where: { id },
      data: {
        ...(parsed.professionalId !== undefined && { professionalId: parsed.professionalId }),
        ...(parsed.date && { date: new Date(parsed.date) }),
        ...(parsed.type && { type: parsed.type }),
        ...(parsed.reason !== undefined && { reason: parsed.reason }),
        ...(parsed.openTime !== undefined && { openTime: parsed.openTime }),
        ...(parsed.closeTime !== undefined && { closeTime: parsed.closeTime }),
      },
    });

    return api.ok(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("Error updating exception:", err);
    return api.serverError("Erro ao atualizar exceção");
  }
}

// DELETE - Deletar exceção
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!user?.companyId) return api.unauthorized();

    const { id } = await params;

    const existing = await prisma.workingHourException.findUnique({
      where: { id },
    });

    if (!existing) {
      return api.notFound("Exceção não encontrada");
    }

    if (existing.companyId !== user.companyId) {
      return api.forbidden("Você não pode deletar esta exceção");
    }

    await prisma.workingHourException.delete({
      where: { id },
    });

    return api.ok({ message: "Exceção deletada com sucesso" });
  } catch (err) {
    console.error("Error deleting exception:", err);
    return api.serverError("Erro ao deletar exceção");
  }
}
