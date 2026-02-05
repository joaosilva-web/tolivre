import { NextRequest } from "next/server";
import { z, ZodError } from "zod";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import { checkFeatureAccess } from "@/app/libs/planGuard";

// Validation schema for Uazapi instance initialization
const uazapiInitSchema = z.object({
  instanceName: z.string().min(1, "Nome da instância é obrigatório"),
  webhookUrl: z.string().url().optional().or(z.literal("")),
  qrcode: z.boolean().default(true),
  webhook_wa_business: z.boolean().default(false),
  companyId: z.string().min(1),
});

// GET endpoint to check instance connection status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const companyId = searchParams.get("companyId");

    if (!token) {
      return api.badRequest("Token da instância é obrigatório");
    }

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    if (user.companyId !== companyId) {
      return api.forbidden("Acesso negado a este recurso");
    }

    // Verificar se o plano tem acesso ao WhatsApp
    if (companyId) {
      const { allowed, planRequired } = await checkFeatureAccess(
        companyId,
        "whatsapp"
      );
      if (!allowed) {
        return api.forbidden(
          `WhatsApp disponível apenas a partir do plano ${planRequired}.`
        );
      }
    }

    const UAZAPI_BASE_URL =
      process.env.UAZAPI_URL?.replace(/\/send\/text$/, "") ||
      "https://free.uazapi.com";
    const UAZAPI_TOKEN = process.env.UAZAPI_TOKEN;

    if (!UAZAPI_TOKEN) {
      return api.serverError("Configuração Uazapi não encontrada");
    }

    // Check instance status via connect endpoint
    const statusUrl = `${UAZAPI_BASE_URL}/instance/connect?token=${token}`;
    const response = await fetch(statusUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        admintoken: UAZAPI_TOKEN,
        token: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return api.badRequest("Erro ao verificar status da instância");
    }

    const data = await response.json();
    const isConnected =
      data.loggedIn === true || data.instance?.status === "open";
    const profileName = data.instance?.profileName || "";

    // Se conectado, atualizar no banco
    if (isConnected && companyId) {
      const prisma = (await import("@/lib/prisma")).default;

      await prisma.company.update({
        where: { id: companyId },
        data: {
          uazapiConnected: true,
          uazapiProfileName: profileName,
          whatsappEnabled: true,
        },
      });

      console.log("[uazapi-status] Updated database: connected =", isConnected);
    }

    return api.ok({
      connected: isConnected,
      status: data.instance?.status || "unknown",
      profileName: profileName,
      jid: data.jid || null,
      loggedIn: data.loggedIn || false,
    });
  } catch (err) {
    console.error("[uazapi-status] Error:", err);
    return api.serverError("Erro ao verificar status");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = uazapiInitSchema.parse(body);

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    // Authorization check
    if (user.companyId !== parsed.companyId) {
      return api.forbidden("Acesso negado a este recurso");
    }

    // Verificar se o plano tem acesso ao WhatsApp
    const { allowed, planRequired } = await checkFeatureAccess(
      parsed.companyId,
      "whatsapp"
    );
    if (!allowed) {
      return api.forbidden(
        `WhatsApp disponível apenas a partir do plano ${planRequired}. Faça upgrade para acessar esta funcionalidade.`
      );
    }

    // Get Uazapi configuration from environment
    const UAZAPI_BASE_URL =
      process.env.UAZAPI_URL?.replace(/\/send\/text$/, "") ||
      "https://free.uazapi.com";
    const UAZAPI_TOKEN = process.env.UAZAPI_TOKEN;

    if (!UAZAPI_TOKEN) {
      return api.serverError(
        "Configuração Uazapi não encontrada. Verifique as variáveis de ambiente."
      );
    }

    // Prepare request payload for Uazapi instance initialization
    // Note: API expects "Name" (capital N) based on error message
    const payload: Record<string, string | boolean> = {
      Name: parsed.instanceName,
      qrcode: parsed.qrcode,
    };

    if (parsed.webhookUrl) {
      payload.webhook = parsed.webhookUrl;
    }

    if (parsed.webhook_wa_business) {
      payload.webhook_wa_business = parsed.webhook_wa_business;
    }

    // Prepare headers for Uazapi API (use admintoken header - confirmed working)
    const headers: Record<string, string> = {
      Accept: "application/json",
      admintoken: UAZAPI_TOKEN || "",
      "Content-Type": "application/json",
    };

    // Helper to mask token for logs (show only first/last 4 chars)
    const maskSecret = (s?: string) => {
      if (!s) return "(missing)";
      if (s.length <= 8) return `${s[0]}***${s[s.length - 1]}`;
      return `${s.slice(0, 4)}...${s.slice(-4)}`;
    };

    console.log(
      "[uazapi-init] Initializing instance:",
      JSON.stringify(payload)
    );
    console.log("[uazapi-init] UAZAPI_BASE_URL:", UAZAPI_BASE_URL);
    console.log(
      "[uazapi-init] initUrl will be:",
      `${UAZAPI_BASE_URL}/instance/init`
    );
    // Log headers with masked token to avoid leaking secret
    console.log("[uazapi-init] headers (masked):", {
      Accept: headers.Accept,
      admintoken: maskSecret(headers.admintoken),
      "Content-Type": headers["Content-Type"],
    });

    // Call Uazapi instance initialization endpoint
    const initUrl = `${UAZAPI_BASE_URL}/instance/init`;
    const response = await fetch(initUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    // Log response status, body and response headers for debugging
    const responseHeadersObj: Record<string, string> = {};
    try {
      response.headers.forEach((value, key) => {
        responseHeadersObj[key] = value;
      });
    } catch {
      // ignore if headers can't be enumerated
    }
    console.log("[uazapi-init] Response:", response.status, responseText);
    console.log("[uazapi-init] Response headers:", responseHeadersObj);

    if (!response.ok) {
      console.error(
        "[uazapi-init] API error:",
        response.status,
        responseText,
        responseHeadersObj
      );
      return api.badRequest(
        `Erro ao criar instância: ${response.status} - ${responseText}`,
        { status: response.status, response: responseText }
      );
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { message: responseText };
    }

    // Get the instance token from response
    const instanceToken = responseData.token || responseData.instance?.token;
    let qrCodeData =
      responseData.qrCode ||
      responseData.qr_code ||
      responseData.instance?.qrcode;

    // Call the connect endpoint to get QR code (as per Uazapi docs)
    if (instanceToken) {
      try {
        console.log("[uazapi-init] Calling connect endpoint to get QR code...");
        console.log("[uazapi-init] Instance token:", instanceToken);

        // Try with token in header (following admintoken pattern)
        const connectUrl = `${UAZAPI_BASE_URL}/instance/connect`;
        const connectResponse = await fetch(connectUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            admintoken: UAZAPI_TOKEN || "",
            token: instanceToken, // Try token in header
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: instanceToken, // Also try in body
          }),
        });

        const connectText = await connectResponse.text();
        console.log(
          "[uazapi-init] Connect response status:",
          connectResponse.status
        );
        console.log("[uazapi-init] Connect response body:", connectText);

        if (connectResponse.ok) {
          const connectData = JSON.parse(connectText);
          console.log(
            "[uazapi-init] Connect data fields:",
            Object.keys(connectData)
          );
          qrCodeData =
            connectData.qrCode ||
            connectData.qr_code ||
            connectData.base64 ||
            connectData.qrcode ||
            connectData.instance?.qrcode;
        } else {
          console.error(
            "[uazapi-init] Connect failed, trying alternative approach..."
          );
          // Try as query parameter
          const connectUrlWithQuery = `${UAZAPI_BASE_URL}/instance/connect?token=${instanceToken}`;
          console.log(
            "[uazapi-init] Trying with query param:",
            connectUrlWithQuery
          );

          const retryResponse = await fetch(connectUrlWithQuery, {
            method: "POST",
            headers: {
              Accept: "application/json",
              admintoken: UAZAPI_TOKEN || "",
              "Content-Type": "application/json",
            },
          });

          const retryText = await retryResponse.text();
          console.log(
            "[uazapi-init] Retry response status:",
            retryResponse.status
          );
          console.log("[uazapi-init] Retry response body:", retryText);

          if (retryResponse.ok) {
            const retryData = JSON.parse(retryText);
            qrCodeData =
              retryData.qrCode ||
              retryData.qr_code ||
              retryData.base64 ||
              retryData.qrcode ||
              retryData.instance?.qrcode;
          }
        }
      } catch (err) {
        console.error("[uazapi-init] Error fetching QR code:", err);
      }
    }

    // Save to database
    const prisma = (await import("@/lib/prisma")).default;

    await prisma.company.update({
      where: { id: parsed.companyId },
      data: {
        uazapiInstanceName: parsed.instanceName,
        uazapiInstanceToken: instanceToken,
        uazapiConnected: false,
      },
    });

    console.log("[uazapi-init] Saved to database:", {
      companyId: parsed.companyId,
      instanceName: parsed.instanceName,
    });

    // Return success response with instance data
    return api.created({
      instanceId: parsed.instanceName,
      instanceName: parsed.instanceName,
      instanceToken: instanceToken,
      qrCode: qrCodeData,
      webhook: parsed.webhookUrl,
      connected: false, // Initially false until QR code is scanned
      message: "Instância criada com sucesso",
      uazapiResponse: responseData,
    });
  } catch (err) {
    console.error("[uazapi-init] Error:", err);

    if (err instanceof ZodError) {
      return api.badRequest("Dados inválidos", err.issues);
    }

    if (err instanceof Error) {
      return api.serverError(`Erro interno: ${err.message}`);
    }

    return api.serverError("Erro interno do servidor");
  }
}
