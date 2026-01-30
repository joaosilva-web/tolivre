import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

// Schema de validação
const companyPageSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug deve conter apenas letras minúsculas, números e hífens"
    ),
  title: z.string().min(1).max(100),
  slogan: z.string().max(200).optional().or(z.literal("")),
  description: z.string().max(5000).optional(),
  logo: z.string().url().optional().or(z.literal("")),
  coverImage: z.string().url().optional().or(z.literal("")),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  whatsapp: z.string().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  showServices: z.boolean(),
  showTestimonials: z.boolean(),
  showAbout: z.boolean(),
  metaTitle: z.string().max(60).optional().or(z.literal("")),
  metaDescription: z.string().max(160).optional().or(z.literal("")),
});

const testimonialSchema = z.object({
  id: z.string().optional(),
  authorName: z.string().min(1).max(100),
  authorAvatar: z.string().max(10).nullable().optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(1).max(1000),
  position: z.number().int().default(0),
});

// GET - Obter configuração da página da empresa
export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    const companyPage = await prisma.companyPage.findUnique({
      where: { companyId: user.companyId },
      include: {
        testimonials: {
          orderBy: { position: "asc" },
        },
      },
    });

    if (!companyPage) {
      return api.notFound("Página da empresa não configurada");
    }

    return api.ok(companyPage);
  } catch (err) {
    console.error("[GET /api/company/page] Error:", err);
    return api.serverError("Erro ao buscar página da empresa");
  }
}

// POST - Criar configuração da página da empresa
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    // Apenas OWNER ou MANAGER podem criar/editar
    if (user.role !== "OWNER" && user.role !== "MANAGER") {
      return api.forbidden("Apenas donos e gerentes podem configurar a página");
    }

    const body = await req.json();
    const parsed = companyPageSchema.parse(body);

    // Verificar se já existe uma página para essa empresa
    const existing = await prisma.companyPage.findUnique({
      where: { companyId: user.companyId },
    });

    if (existing) {
      return api.badRequest("Página já existe. Use PUT para atualizar");
    }

    // Verificar se o slug já está em uso
    const slugExists = await prisma.companyPage.findUnique({
      where: { slug: parsed.slug },
    });

    if (slugExists) {
      return api.badRequest("Este slug já está em uso por outra empresa");
    }

    const companyPage = await prisma.companyPage.create({
      data: {
        ...parsed,
        companyId: user.companyId,
      },
    });

    return api.created(companyPage);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[POST /api/company/page] Error:", err);
    return api.serverError("Erro ao criar página da empresa");
  }
}

// PUT - Atualizar configuração da página da empresa
export async function PUT(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    // Apenas OWNER ou MANAGER podem criar/editar
    if (user.role !== "OWNER" && user.role !== "MANAGER") {
      return api.forbidden("Apenas donos e gerentes podem configurar a página");
    }

    const body = await req.json();
    const { testimonials, ...pageData } = body;

    const parsed = companyPageSchema.parse(pageData);

    // Verificar se a página existe
    const existing = await prisma.companyPage.findUnique({
      where: { companyId: user.companyId },
    });

    if (!existing) {
      return api.notFound(
        "Página não encontrada. Use POST para criar uma nova"
      );
    }

    // Se o slug mudou, verificar se o novo slug está disponível
    if (parsed.slug !== existing.slug) {
      const slugExists = await prisma.companyPage.findUnique({
        where: { slug: parsed.slug },
      });

      if (slugExists) {
        return api.badRequest("Este slug já está em uso por outra empresa");
      }
    }

    // Atualizar a página
    const companyPage = await prisma.companyPage.update({
      where: { companyId: user.companyId },
      data: parsed,
      include: {
        testimonials: {
          orderBy: { position: "asc" },
        },
      },
    });

    // Se testimonials foram enviados, atualizar também
    if (testimonials && Array.isArray(testimonials)) {
      const validatedTestimonials = z
        .array(testimonialSchema)
        .parse(testimonials);

      // Deletar testimonials que não estão mais na lista
      const newTestimonialIds = validatedTestimonials
        .filter((t) => t.id)
        .map((t) => t.id);

      await prisma.pageTestimonial.deleteMany({
        where: {
          companyPageId: companyPage.id,
          id: {
            notIn: newTestimonialIds as string[],
          },
        },
      });

      // Atualizar ou criar testimonials
      for (const testimonial of validatedTestimonials) {
        if (testimonial.id) {
          await prisma.pageTestimonial.update({
            where: { id: testimonial.id },
            data: {
              authorName: testimonial.authorName,
              authorAvatar: testimonial.authorAvatar || null,
              rating: testimonial.rating,
              text: testimonial.text,
              position: testimonial.position,
            },
          });
        } else {
          await prisma.pageTestimonial.create({
            data: {
              companyPageId: companyPage.id,
              authorName: testimonial.authorName,
              authorAvatar: testimonial.authorAvatar || null,
              rating: testimonial.rating,
              text: testimonial.text,
              position: testimonial.position,
            },
          });
        }
      }

      // Recarregar com testimonials atualizados
      const updatedPage = await prisma.companyPage.findUnique({
        where: { id: companyPage.id },
        include: {
          testimonials: {
            orderBy: { position: "asc" },
          },
        },
      });

      return api.ok(updatedPage);
    }

    return api.ok(companyPage);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }
    console.error("[PUT /api/company/page] Error:", err);
    return api.serverError("Erro ao atualizar página da empresa");
  }
}
