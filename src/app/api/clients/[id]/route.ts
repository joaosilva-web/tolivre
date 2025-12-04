import { NextRequest } from "next/server";
import { z, ZodError } from "zod";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const id =
    req.nextUrl.searchParams.get("id") || req.nextUrl.pathname.split("/").pop();
  if (!id) return api.badRequest("id é obrigatório");

  try {
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) return api.notFound("Cliente não encontrado");
    return api.ok(client);
  } catch (err) {
    return api.serverError((err as Error).message || "Erro ao buscar cliente");
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id =
      req.nextUrl.searchParams.get("id") ||
      req.nextUrl.pathname.split("/").pop();
    if (!id) return api.badRequest("id é obrigatório");

    const body = await req.json();
    const parsed = updateSchema.parse(body);

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const existing = await prisma.client.findUnique({ where: { id } });
    if (!existing) return api.notFound("Cliente não encontrado");
    if (existing.companyId !== user.companyId)
      return api.forbidden("Você não pode alterar este cliente");

    const updated = await prisma.client.update({ where: { id }, data: parsed });
    return api.ok(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      const details = err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      }));
      return api.badRequest("Erro de validação", details);
    }
    return api.serverError(
      (err as Error).message || "Erro ao atualizar cliente"
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id =
      req.nextUrl.searchParams.get("id") ||
      req.nextUrl.pathname.split("/").pop();
    if (!id) return api.badRequest("id é obrigatório");

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const existing = await prisma.client.findUnique({ where: { id } });
    if (!existing) return api.notFound("Cliente não encontrado");
    if (existing.companyId !== user.companyId)
      return api.forbidden("Você não pode remover este cliente");

    await prisma.client.delete({ where: { id } });
    return api.ok({ id });
  } catch (err) {
    return api.serverError((err as Error).message || "Erro ao deletar cliente");
  }
}
