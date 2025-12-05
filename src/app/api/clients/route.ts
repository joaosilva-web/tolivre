import { NextRequest } from "next/server";
import { z, ZodError } from "zod";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { emitNewClient } from "@/lib/websocket";

const clientSchema = z.object({
  companyId: z.string(),
  name: z.string().min(1, "O nome do cliente é obrigatório"),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

// GET /api/clients?companyId=...
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const companyId = url.searchParams.get("companyId");
  const q = url.searchParams.get("q") || "";
  const page = Number(url.searchParams.get("page") || "1");
  const pageSize = Number(url.searchParams.get("pageSize") || "10");

  if (!companyId) return api.badRequest("companyId é obrigatório");

  try {
    const where: any = { companyId };

    if (q && q.trim().length > 0) {
      const search = q.trim();
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const total = await prisma.client.count({ where });

    const clients = await prisma.client.findMany({
      where,
      orderBy: { name: "asc" },
      skip: (Math.max(1, page) - 1) * pageSize,
      take: pageSize,
    });

    return api.ok({ data: clients, total, page, pageSize });
  } catch (err) {
    return api.serverError((err as Error).message || "Erro ao listar clientes");
  }
}

// POST /api/clients
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = clientSchema.parse(body);

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();
    if (user.companyId !== parsed.companyId)
      return api.forbidden("Você não pode criar clientes para esta empresa");

    const created = await prisma.client.create({ data: parsed });

    // Emit WebSocket notification
    (async () => {
      try {
        emitNewClient(parsed.companyId, {
          id: created.id,
          name: created.name,
          email: created.email ?? undefined,
          phone: created.phone ?? undefined,
        });
      } catch (err) {
        console.error("[WebSocket] Failed to emit new client:", err);
      }
    })();

    return api.created(created);
  } catch (err) {
    if (err instanceof ZodError) {
      const errorDetails = err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      }));
      return api.badRequest("Erro de validação", errorDetails);
    }
    return api.serverError((err as Error).message || "Erro ao criar cliente");
  }
}
