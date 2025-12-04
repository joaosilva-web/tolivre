import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    // Authorization check
    if (user.companyId !== companyId) {
      return api.forbidden("Acesso negado a este recurso");
    }

    // Get Uazapi configuration from environment
    const UAZAPI_BASE_URL =
      process.env.UAZAPI_URL?.replace(/\/send\/text$/, "") ||
      "https://free.uazapi.com";
    const UAZAPI_TOKEN = process.env.UAZAPI_TOKEN;

    if (!UAZAPI_TOKEN) {
      return api.serverError("Configuração Uazapi não encontrada");
    }

    // For now, we'll return a basic status check
    // In a real implementation, you might want to store instance data in your database
    // and check the actual status with Uazapi API

    // Prepare headers for Uazapi API
    const headers: Record<string, string> = {
      Accept: "application/json",
      admintoken: UAZAPI_TOKEN || "",
      "Content-Type": "application/json",
    };

    // Example: Check if we can reach Uazapi API
    try {
      const testResponse = await fetch(`${UAZAPI_BASE_URL}/instance/list`, {
        method: "GET",
        headers,
      });

      const isConnected = testResponse.ok;

      return api.ok({
        connected: isConnected,
        instanceId: companyId, // Using companyId as instance identifier for now
        message: isConnected
          ? "Conexão com Uazapi ativa"
          : "Problemas de conexão com Uazapi",
      });
    } catch (err) {
      console.error("[uazapi-status] Connection error:", err);

      return api.ok({
        connected: false,
        message: "Erro ao conectar com Uazapi",
      });
    }
  } catch (err) {
    console.error("[uazapi-status] Error:", err);
    return api.serverError("Erro interno do servidor");
  }
}
