// app/api/company/route.ts
import { NextRequest } from "next/server";
import { Company } from "@/generated/prisma";
import { getUserFromCookie, JWTPayload } from "@/app/libs/auth";
import { z, ZodError } from "zod";

import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { signToken } from "@/app/libs/auth";

// Schema para validar dados da empresa
const companySchema = z.object({
  nomeFantasia: z.string().min(1, "Nome fantasia é obrigatório"),
  razaoSocial: z.string().optional(),
  cnpjCpf: z.string().min(11, "CNPJ ou CPF inválido"),
  endereco: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email().optional(),
  whatsappEnabled: z.boolean().optional(),
  whatsappNumber: z.string().optional().nullable(),
});

// Tipagem do body validado
type CompanyInput = z.infer<typeof companySchema>;

export async function POST(req: NextRequest) {
  const user: JWTPayload | null = await getUserFromCookie();
  if (!user) return api.unauthorized();

  try {
    const body: unknown = await req.json();
    const data: CompanyInput = companySchema.parse(body); // valida o body
    console.log("Dados validados:", data);

    // Definir trial de 14 dias
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    const company: Company = await prisma.company.create({
      data: {
        ...data,
        trialEndsAt,
        users: { connect: { id: user.id } },
      },
    });
    console.log("Empresa criada:", company.id);

    // Vincula o usuário à empresa
    await prisma.user.update({
      where: { id: user.id },
      data: { companyId: company.id },
    });
    console.log("Usuário atualizado com companyId:", company.id);

    // Re-sign token including the new companyId and set cookie so client session updates
    const newToken = signToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: company.id,
    });

    const res = api.created(company);
    res.cookies.set({
      name: "token",
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error: unknown) {
    console.error("Erro ao criar empresa:", error);
    if (error instanceof ZodError) {
      return api.badRequest(
        "Erro de validação",
        error.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        }))
      );
    }
    // Retornar erro mais específico
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2002") {
        return api.badRequest("CNPJ/CPF já cadastrado");
      }
    }
    return api.serverError("Erro ao criar empresa");
  }
}

export async function PUT(req: NextRequest) {
  const user: JWTPayload | null = await getUserFromCookie();
  if (!user) return api.unauthorized();
  if (!user.companyId) return api.badRequest("Empresa não encontrada");

  try {
    const body: unknown = await req.json();
    const data: CompanyInput = companySchema.parse(body); // valida o body

    const company: Company = await prisma.company.update({
      where: { id: user.companyId },
      data,
    });

    return api.ok(company);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof ZodError) {
      return api.badRequest(
        "Erro de validação",
        error.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        }))
      );
    }
    return api.serverError("Erro ao atualizar empresa");
  }
}
