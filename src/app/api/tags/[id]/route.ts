import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { z } from "zod";

const TagUpdateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor inválida (formato: #RRGGBB)").optional(),
});

// GET - Buscar tag específica
export async function GET(
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

    // TODO: Uncomment after running migration for tags system
    return api.ok({ message: "Tags endpoint ready. Run migration to activate." });
    
    // const tag = await prisma.tag.findUnique({
    //   where: { id },
    //   include: {
    //     _count: {
    //       select: {
    //         clients: true,
    //       },
    //     },
    //   },
    // });

    // if (!tag) {
    //   return api.notFound("Tag não encontrada");
    // }

    // if (tag.companyId !== user.companyId) {
    //   return api.forbidden("Você não pode acessar esta tag");
    // }

    // return api.ok(tag);
  } catch (err) {
    console.error("[GET /api/tags/[id]] Error:", err);
    return api.serverError("Erro ao buscar tag");
  }
}

// PATCH - Atualizar tag
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

    // TODO: Uncomment after running migration for tags system
    return api.ok({ message: "Tags endpoint ready. Run migration to activate." });

    // const existing = await prisma.tag.findUnique({
    //   where: { id },
    // });

    // if (!existing) {
    //   return api.notFound("Tag não encontrada");
    // }

    // if (existing.companyId !== user.companyId) {
    //   return api.forbidden("Você não pode editar esta tag");
    // }

    // const body = await req.json();
    // const parsed = TagUpdateSchema.parse(body);

    // // Se está mudando o nome, verificar se não há conflito
    // if (parsed.name && parsed.name !== existing.name) {
    //   const conflict = await prisma.tag.findUnique({
    //     where: {
    //       companyId_name: {
    //         companyId: user.companyId,
    //         name: parsed.name,
    //       },
    //     },
    //   });

    //   if (conflict) {
    //     return api.badRequest("Já existe uma tag com este nome");
    //   }
    // }

    // const updated = await prisma.tag.update({
    //   where: { id },
    //   data: parsed,
    // });

    // return api.ok(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[PATCH /api/tags/[id]] Error:", err);
    return api.serverError("Erro ao atualizar tag");
  }
}

// DELETE - Deletar tag
export async function DELETE(
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

    // TODO: Uncomment after running migration for tags system
    return api.ok({ message: "Tags endpoint ready. Run migration to activate." });

    // const existing = await prisma.tag.findUnique({
    //   where: { id },
    // });

    // if (!existing) {
    //   return api.notFound("Tag não encontrada");
    // }

    // if (existing.companyId !== user.companyId) {
    //   return api.forbidden("Você não pode deletar esta tag");
    // }

    // await prisma.tag.delete({
    //   where: { id },
    // });

    // return api.ok({ message: "Tag deletada com sucesso" });
  } catch (err) {
    console.error("[DELETE /api/tags/[id]] Error:", err);
    return api.serverError("Erro ao deletar tag");
  }
}
