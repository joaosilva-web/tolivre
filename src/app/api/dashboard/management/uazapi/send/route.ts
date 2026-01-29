import { NextRequest } from "next/server";
import { z, ZodError } from "zod";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import { sendText } from "@/lib/uazapi";

// Helper para verificar se é usuário interno do ToLivre
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

const sendPreviewSchema = z.object({
  to: z.string().min(1, "Informe um número destino"),
  message: z.string().min(1, "Informe a mensagem"),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    // Verifica se é staff interno do ToLivre
    if (!isToLivreStaff(user.email)) {
      return api.forbidden("Acesso restrito à equipe interna do ToLivre");
    }

    if (!user.companyId) return api.forbidden("Empresa não identificada");

    const payload = await req.json();
    const parsed = sendPreviewSchema.parse(payload);

    const result = await sendText({
      to: parsed.to,
      message: parsed.message,
    });

    if (!result.ok) {
      console.error("[dashboard/management/uazapi/send] API error", result);
      return api.serverError("Não foi possível enviar a mensagem de teste");
    }

    return api.ok({ success: true });
  } catch (error) {
    console.error("[dashboard/management/uazapi/send] error", error);
    if (error instanceof ZodError) {
      return api.badRequest("Dados inválidos", error.issues);
    }

    return api.serverError("Erro ao enviar mensagem de teste");
  }
}
