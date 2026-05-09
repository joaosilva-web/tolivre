import { NextRequest } from "next/server";
import { z, ZodError } from "zod";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import { checkFeatureAccess } from "@/app/libs/planGuard";
import evolution from "@/lib/evolution";

const initSchema = z.object({
  instanceName: z.string().min(1, "Nome da instância é obrigatório"),
  webhookUrl: z.string().url().optional().or(z.literal("")),
  companyId: z.string().min(1),
});

// GET — verifica status de conexão da instância
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();
    if (user.companyId !== companyId) return api.forbidden("Acesso negado");

    if (companyId) {
      const { allowed, planRequired } = await checkFeatureAccess(companyId, "whatsapp");
      if (!allowed) {
        return api.forbidden(`WhatsApp disponível a partir do plano ${planRequired}.`);
      }
    }

    const prisma = (await import("@/lib/prisma")).default;
    const company = await prisma.company.findUnique({
      where: { id: companyId! },
      select: { uazapiInstanceName: true, uazapiConnected: true, uazapiProfileName: true },
    });

    if (!company?.uazapiInstanceName) {
      return api.ok({ connected: false, profileName: null });
    }

    const status = await evolution.getInstanceStatus(company.uazapiInstanceName);

    if (status.connected !== company.uazapiConnected) {
      await prisma.company.update({
        where: { id: companyId! },
        data: {
          uazapiConnected: status.connected,
          uazapiProfileName: status.profileName || undefined,
          whatsappEnabled: status.connected,
        },
      });
    }

    return api.ok({
      connected: status.connected,
      profileName: status.profileName || company.uazapiProfileName,
      instanceName: company.uazapiInstanceName,
      state: status.state,
    });
  } catch (err) {
    console.error("[evolution-init GET] Error:", err);
    return api.serverError("Erro ao verificar status");
  }
}

// POST — cria instância e devolve QR code
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = initSchema.parse(body);

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();
    if (user.companyId !== parsed.companyId) return api.forbidden("Acesso negado");

    const { allowed, planRequired } = await checkFeatureAccess(parsed.companyId, "whatsapp");
    if (!allowed) {
      return api.forbidden(
        `WhatsApp disponível a partir do plano ${planRequired}.`,
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    const webhookUrl = parsed.webhookUrl || (appUrl ? `${appUrl}/api/webhooks/evolution` : undefined);

    // Criar instância na Evolution API
    const created = await evolution.createInstance(parsed.instanceName, webhookUrl);
    if (!created.ok) {
      return api.badRequest(`Erro ao criar instância: ${created.body}`);
    }

    // Buscar QR code
    const qrResult = await evolution.getQRCode(parsed.instanceName);

    const prisma = (await import("@/lib/prisma")).default;
    await prisma.company.update({
      where: { id: parsed.companyId },
      data: {
        uazapiInstanceName: parsed.instanceName,
        uazapiConnected: false,
        whatsappEnabled: false,
      },
    });

    return api.created({
      instanceName: parsed.instanceName,
      qrCode: qrResult.qrCode,
      connected: false,
      message: "Instância criada. Escaneie o QR code com o WhatsApp.",
    });
  } catch (err) {
    console.error("[evolution-init POST] Error:", err);
    if (err instanceof ZodError) return api.badRequest("Dados inválidos", err.issues);
    return api.serverError("Erro ao criar instância");
  }
}
