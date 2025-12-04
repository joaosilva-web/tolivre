import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { z } from "zod";

const TagSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor inválida (formato: #RRGGBB)").optional(),
});

// GET - Listar todas as tags da empresa
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return api.unauthorized();
    }

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa vinculada");
    }

    // TODO: Uncomment after running migration for tags system
    // const tags = await prisma.tag.findMany({
    //   where: {
    //     companyId: user.companyId,
    //   },
    //   include: {
    //     _count: {
    //       select: {
    //         clients: true,
    //       },
    //     },
    //   },
    //   orderBy: {
    //     name: "asc",
    //   },
    // });

    return api.ok([]);
  } catch (err) {
    console.error("[GET /api/tags] Error:", err);
    return api.serverError("Erro ao listar tags");
  }
}

// POST - Criar nova tag
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return api.unauthorized();
    }

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa vinculada");
    }

    const body = await req.json();
    const parsed = TagSchema.parse(body);

    // TODO: Uncomment after running migration for tags system
    // // Verificar se já existe tag com mesmo nome
    // const existing = await prisma.tag.findUnique({
    //   where: {
    //     companyId_name: {
    //       companyId: user.companyId,
    //       name: parsed.name,
    //     },
    //   },
    // });

    // if (existing) {
    //   return api.badRequest("Já existe uma tag com este nome");
    // }

    // const tag = await prisma.tag.create({
    //   data: {
    //     name: parsed.name,
    //     color: parsed.color || "#6366f1",
    //     companyId: user.companyId,
    //   },
    // });

    // return api.created(tag);
    return api.ok({ message: "Tags endpoint ready. Run migration to activate." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[POST /api/tags] Error:", err);
    return api.serverError("Erro ao criar tag");
  }
}
