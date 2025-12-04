import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { z } from "zod";

const PaymentUpdateSchema = z.object({
  paymentStatus: z.enum(["PENDING", "PAID", "PARTIAL", "CANCELED"]),
  paidAmount: z.number().min(0).optional(),
  paymentMethod: z.string().optional(),
  paymentDate: z.string().optional(), // ISO date string
  notes: z.string().optional(),
});

// PATCH - Atualizar informações de pagamento de um agendamento
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUserFromCookie();
    if (!user) {
      return api.unauthorized();
    }

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa vinculada");
    }

    const existing = await prisma.appointment.findUnique({
      where: { id },
      select: { companyId: true, price: true },
    });

    if (!existing) {
      return api.notFound("Agendamento não encontrado");
    }

    if (existing.companyId !== user.companyId) {
      return api.forbidden("Você não pode editar este agendamento");
    }

    const body = await req.json();
    const parsed = PaymentUpdateSchema.parse(body);

    // Validação: se status é PAID, paidAmount deve ser igual ao price
    if (parsed.paymentStatus === "PAID" && parsed.paidAmount !== undefined) {
      if (parsed.paidAmount < (existing.price || 0)) {
        return api.badRequest("Para status PAID, o valor pago deve ser igual ou maior que o preço");
      }
    }

    // Se paymentDate não foi fornecido mas status é PAID, usar data atual
    let paymentDate = parsed.paymentDate ? new Date(parsed.paymentDate) : undefined;
    if (parsed.paymentStatus === "PAID" && !paymentDate) {
      paymentDate = new Date();
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        paymentStatus: parsed.paymentStatus,
        paidAmount: parsed.paidAmount,
        paymentMethod: parsed.paymentMethod,
        paymentDate: paymentDate,
        notes: parsed.notes,
      },
      include: {
        service: {
          select: {
            name: true,
            price: true,
          },
        },
        professional: {
          select: {
            name: true,
          },
        },
        client: {
          select: {
            name: true,
          },
        },
      },
    });

    return api.ok(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[PATCH /api/appointments/[id]/payment] Error:", err);
    return api.serverError("Erro ao atualizar pagamento");
  }
}
