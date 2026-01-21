import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_FIELDS = ["logo", "coverImage"] as const;
type AllowedField = (typeof ALLOWED_FIELDS)[number];

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa associada");
    }

    if (user.role !== "OWNER" && user.role !== "MANAGER") {
      return api.forbidden("Apenas donos e gerentes podem enviar imagens");
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const field = formData.get("field") as AllowedField | null;

    if (!file) return api.badRequest("Nenhuma imagem enviada");
    if (!field || !ALLOWED_FIELDS.includes(field)) {
      return api.badRequest("Campo de imagem inválido");
    }

    if (file.size > MAX_SIZE_BYTES) {
      return api.badRequest("Imagem muito grande. Máximo 5MB");
    }

    if (!file.type.startsWith("image/")) {
      return api.badRequest("Arquivo deve ser uma imagem");
    }

    const page = await prisma.companyPage.findUnique({
      where: { companyId: user.companyId },
      select: { id: true },
    });

    if (!page) {
      return api.badRequest(
        "Configure e salve as informações básicas da página antes de enviar imagens",
      );
    }

    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    const updated = await prisma.companyPage.update({
      where: { id: page.id },
      data: { [field]: dataUrl },
      select: { id: true, logo: true, coverImage: true },
    });

    return api.ok({
      message: "Imagem atualizada com sucesso",
      field,
      value: updated[field as AllowedField],
    });
  } catch (err) {
    console.error("[POST /api/company/page/upload] Error:", err);
    return api.serverError("Erro ao enviar imagem");
  }
}
