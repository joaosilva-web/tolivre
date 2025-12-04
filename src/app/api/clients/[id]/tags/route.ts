import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { z } from "zod";

const ClientTagSchema = z.object({
  tagId: z.string(),
});

// GET - Listar tags de um cliente
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

    // Verificar se cliente pertence à empresa
    const client = await prisma.client.findUnique({
      where: { id },
      select: { companyId: true },
    });

    if (!client) {
      return api.notFound("Cliente não encontrado");
    }

    if (client.companyId !== user.companyId) {
      return api.forbidden("Você não pode acessar este cliente");
    }

    // TODO: Uncomment after running migration for tags system
    // const clientTags = await prisma.clientTag.findMany({
    //   where: {
    //     clientId: id,
    //   },
    //   include: {
    //     tag: true,
    //   },
    // });
    // return api.ok(clientTags.map((ct) => ct.tag));

    return api.ok([]);
  } catch (err) {
    console.error("[GET /api/clients/[id]/tags] Error:", err);
    return api.serverError("Erro ao listar tags do cliente");
  }
}

// POST - Adicionar tag ao cliente
export async function POST(
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

    // Verificar se cliente pertence à empresa
    const client = await prisma.client.findUnique({
      where: { id },
      select: { companyId: true },
    });

    if (!client) {
      return api.notFound("Cliente não encontrado");
    }

    if (client.companyId !== user.companyId) {
      return api.forbidden("Você não pode editar este cliente");
    }

    // TODO: Uncomment after running migration for tags system
    return api.ok({ message: "Client tags endpoint ready. Run migration to activate." });

    // const body = await req.json();
    // const parsed = ClientTagSchema.parse(body);

    // // Verificar se tag pertence à empresa
    // const tag = await prisma.tag.findUnique({
    //   where: { id: parsed.tagId },
    //   select: { companyId: true },
    // });

    // if (!tag) {
    //   return api.notFound("Tag não encontrada");
    // }

    // if (tag.companyId !== user.companyId) {
    //   return api.forbidden("Você não pode usar esta tag");
    // }

    // // TODO: Uncomment after running migration for tags system
    // // Verificar se já existe
    // const existing = await prisma.clientTag.findUnique({
    //   where: {
    //     clientId_tagId: {
    //       clientId: id,
    //       tagId: parsed.tagId,
    //     },
    //   },
    // });

    // if (existing) {
    //   return api.badRequest("Cliente já possui esta tag");
    // }

    // const clientTag = await prisma.clientTag.create({
    //   data: {
    //     clientId: id,
    //     tagId: parsed.tagId,
    //   },
    //   include: {
    //     tag: true,
    //   },
    // });

    // return api.created(clientTag.tag);

    return api.ok({ message: "Tags endpoint ready. Run migration to activate." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[POST /api/clients/[id]/tags] Error:", err);
    return api.serverError("Erro ao adicionar tag ao cliente");
  }
}

// DELETE - Remover tag do cliente
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const tagId = searchParams.get("tagId");

    if (!tagId) {
      return api.badRequest("tagId é obrigatório");
    }

    const user = await getUserFromCookie();
    if (!user) {
      return api.unauthorized();
    }

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa vinculada");
    }

    // Verificar se cliente pertence à empresa
    const client = await prisma.client.findUnique({
      where: { id },
      select: { companyId: true },
    });

    if (!client) {
      return api.notFound("Cliente não encontrado");
    }

    if (client.companyId !== user.companyId) {
      return api.forbidden("Você não pode editar este cliente");
    }

    // TODO: Uncomment after running migration for tags system
    // const deleted = await prisma.clientTag.deleteMany({
    //   where: {
    //     clientId: id,
    //     tagId: tagId,
    //   },
    // });

    // if (deleted.count === 0) {
    //   return api.notFound("Tag não está associada ao cliente");
    // }

    return api.ok({ message: "Tags endpoint ready. Run migration to activate." });
  } catch (err) {
    console.error("[DELETE /api/clients/[id]/tags] Error:", err);
    return api.serverError("Erro ao remover tag do cliente");
  }
}
