import { NextRequest } from "next/server";
import * as api from "@/app/libs/apiResponse";

const UAZAPI_URL = (process.env.UAZAPI_URL || "").replace(/\/$/, "");
const UAZAPI_TOKEN =
  process.env.UAZAPI_INSTANCE_TOKEN || process.env.UAZAPI_TOKEN || "";
const UAZAPI_HEADER = process.env.UAZAPI_HEADER || "token";

// POST - Configurar webhook do UAZAPI
export async function POST(req: NextRequest) {
  try {
    if (!UAZAPI_URL || !UAZAPI_TOKEN) {
      return api.badRequest("UAZAPI não configurado (UAZAPI_URL/UAZAPI_TOKEN)");
    }

    // URL do webhook (substitua pelo domínio correto em produção)
    const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/uazapi`;

    const payload = {
      url: webhookUrl,
      events: ["messages"], // Receber eventos de mensagens
      excludeMessages: ["wasSentByApi"], // IMPORTANTE: evitar loops
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (UAZAPI_HEADER.toLowerCase() === "authorization") {
      headers["Authorization"] = `Bearer ${UAZAPI_TOKEN}`;
    } else {
      headers[UAZAPI_HEADER] = UAZAPI_TOKEN;
    }

    console.log("[configure-webhook] Configurando webhook:", webhookUrl);

    const response = await fetch(`${UAZAPI_URL}/webhook`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    if (!response.ok) {
      console.error("[configure-webhook] Erro:", response.status, responseData);
      return api.serverError(`Erro ao configurar webhook: ${response.status}`);
    }

    console.log(
      "[configure-webhook] Webhook configurado com sucesso:",
      responseData,
    );

    return api.ok({
      message: "Webhook configurado com sucesso",
      webhookUrl,
      response: responseData,
    });
  } catch (err) {
    console.error("[configure-webhook] Erro:", err);
    return api.serverError("Erro ao configurar webhook");
  }
}

// GET - Verificar configuração atual do webhook
export async function GET() {
  try {
    if (!UAZAPI_URL || !UAZAPI_TOKEN) {
      return api.badRequest("UAZAPI não configurado (UAZAPI_URL/UAZAPI_TOKEN)");
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (UAZAPI_HEADER.toLowerCase() === "authorization") {
      headers["Authorization"] = `Bearer ${UAZAPI_TOKEN}`;
    } else {
      headers[UAZAPI_HEADER] = UAZAPI_TOKEN;
    }

    const response = await fetch(`${UAZAPI_URL}/webhook`, {
      method: "GET",
      headers,
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    if (!response.ok) {
      console.error(
        "[configure-webhook] Erro ao buscar:",
        response.status,
        responseData,
      );
      return api.serverError(`Erro ao buscar webhook: ${response.status}`);
    }

    return api.ok(responseData);
  } catch (err) {
    console.error("[configure-webhook] Erro ao buscar:", err);
    return api.serverError("Erro ao buscar webhook");
  }
}
