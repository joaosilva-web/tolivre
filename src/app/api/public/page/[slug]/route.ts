import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

// GET público - Obter página da empresa pelo slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const companyPage = await prisma.companyPage.findUnique({
      where: { slug },
      include: {
        company: {
          select: {
            id: true,
            nomeFantasia: true,
            telefone: true,
            email: true,
            endereco: true,
          },
        },
        testimonials: {
          orderBy: { position: "asc" },
        },
      },
    });

    if (!companyPage) {
      return api.notFound("Página não encontrada");
    }

    // Buscar serviços da empresa (se showServices for true)
    let services: Array<{
      id: string;
      name: string;
      price: number;
      duration: number;
    }> = [];
    if (companyPage.showServices) {
      services = await prisma.service.findMany({
        where: { companyId: companyPage.companyId },
        select: {
          id: true,
          name: true,
          price: true,
          duration: true,
        },
        orderBy: { name: "asc" },
      });
    }

    // Buscar profissionais disponíveis com fotos e bio
    const professionals = await prisma.user.findMany({
      where: {
        companyId: companyPage.companyId,
        role: {
          in: ["OWNER", "MANAGER", "EMPLOYEE"],
        },
      },
      select: {
        id: true,
        name: true,
        photoUrl: true,
        bio: true,
        services: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return api.ok({
      ...companyPage,
      // Converter null em string vazia para evitar erros de validação
      whatsapp: companyPage.whatsapp || "",
      services,
      professionals,
    });
  } catch (err) {
    console.error("[GET /api/public/page/:slug] Error:", err);
    return api.serverError("Erro ao buscar página da empresa");
  }
}
