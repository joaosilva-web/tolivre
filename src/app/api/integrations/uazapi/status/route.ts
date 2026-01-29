import { NextRequest } from "next/server";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

export async function GET(req: NextRequest) {
  try {
    console.log("[uazapi-status] request received", {
      url: req.url,
    });
    const user = await getUserFromCookie();
    if (!user) {
      console.warn("[uazapi-status] unauthorized request");
      return api.unauthorized();
    }

    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    // Authorization check
    if (user.companyId !== companyId) {
      console.warn("[uazapi-status] forbidden request", {
        userCompanyId: user.companyId,
        companyId,
      });
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

    // Check database for connection status
    const prisma = (await import("@/lib/prisma")).default;

    if (!companyId) {
      return api.badRequest("Company ID é obrigatório");
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        uazapiConnected: true,
        uazapiInstanceName: true,
        uazapiProfileName: true,
        uazapiInstanceToken: true,
      },
    });

    if (!company) {
      return api.notFound("Empresa não encontrada");
    }

    let connectionResult = {
      connected: company.uazapiConnected,
      profileName: company.uazapiProfileName,
      message: company.uazapiConnected
        ? `WhatsApp conectado${
            company.uazapiProfileName ? ` - ${company.uazapiProfileName}` : ""
          }`
        : "WhatsApp não conectado",
    };

    const maskSecret = (value?: string | null) => {
      if (!value) return "(missing)";
      if (value.length <= 8) return `${value[0]}***${value[value.length - 1]}`;
      return `${value.slice(0, 4)}...${value.slice(-4)}`;
    };

    if (company.uazapiInstanceToken) {
      const headers = {
        Accept: "application/json",
        admintoken: UAZAPI_TOKEN,
        token: company.uazapiInstanceToken,
        "Content-Type": "application/json",
      };

      const parseResponse = async (response: Response) => {
        const text = await response.text();
        if (!text) return {} as Record<string, any>;
        try {
          return JSON.parse(text);
        } catch (parseError) {
          console.warn("[uazapi-status] failed to parse response", parseError);
          return {} as Record<string, any>;
        }
      };

      const fetchStatus = async () => {
        const statusUrl = `${UAZAPI_BASE_URL}/instance/status?token=${company.uazapiInstanceToken}`;
        console.log("[uazapi-status] calling status", {
          url: statusUrl,
          headers: {
            Accept: headers.Accept,
            admintoken: maskSecret(headers.admintoken),
            token: maskSecret(headers.token),
            "Content-Type": headers["Content-Type"],
          },
        });
        const statusResponse = await fetch(statusUrl, {
          method: "GET",
          headers,
        });

        if (!statusResponse.ok) {
          throw new Error(
            `Status request failed with ${statusResponse.status}`,
          );
        }

        return parseResponse(statusResponse);
      };

      const fetchConnect = async () => {
        const connectUrl = `${UAZAPI_BASE_URL}/instance/connect`;
        console.log("[uazapi-status] calling connect", {
          url: connectUrl,
          headers: {
            Accept: headers.Accept,
            admintoken: maskSecret(headers.admintoken),
            token: maskSecret(headers.token),
            "Content-Type": headers["Content-Type"],
          },
          body: { token: maskSecret(company.uazapiInstanceToken) },
        });
        const connectResponse = await fetch(connectUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ token: company.uazapiInstanceToken }),
        });

        if (!connectResponse.ok) {
          throw new Error(
            `Connect request failed with ${connectResponse.status}`,
          );
        }

        return parseResponse(connectResponse);
      };

      try {
        const statusData = await fetchStatus();
        const isConnected =
          statusData.status?.connected === true ||
          statusData.instance?.status === "connected" ||
          statusData.instance?.status === "open";
        const profileName =
          statusData.instance?.profileName || company.uazapiProfileName;

        const updatedCompany = await prisma.company.update({
          where: { id: companyId },
          data: {
            uazapiConnected: isConnected,
            uazapiProfileName: profileName || undefined,
          },
        });

        connectionResult = {
          connected: isConnected,
          profileName: updatedCompany.uazapiProfileName,
          message: isConnected
            ? `WhatsApp conectado${
                updatedCompany.uazapiProfileName
                  ? ` - ${updatedCompany.uazapiProfileName}`
                  : ""
              }`
            : "WhatsApp não conectado",
        };
      } catch (statusError) {
        console.warn(
          "[uazapi-status] status endpoint failed, falling back",
          statusError,
        );

        try {
          const connectData = await fetchConnect();
          const isConnected =
            connectData.loggedIn === true ||
            connectData.instance?.status === "open" ||
            connectData.instance?.status === "connected";
          const profileName =
            connectData.instance?.profileName || company.uazapiProfileName;

          const updatedCompany = await prisma.company.update({
            where: { id: companyId },
            data: {
              uazapiConnected: isConnected,
              uazapiProfileName: profileName || undefined,
            },
          });

          connectionResult = {
            connected: isConnected,
            profileName: updatedCompany.uazapiProfileName,
            message: isConnected
              ? `WhatsApp conectado${
                  updatedCompany.uazapiProfileName
                    ? ` - ${updatedCompany.uazapiProfileName}`
                    : ""
                }`
              : "WhatsApp não conectado",
          };
        } catch (connectError) {
          console.error("[uazapi-status] remote check failed", connectError);
        }
      }
    }

    return api.ok({
      connected: connectionResult.connected,
      instanceId: company.uazapiInstanceName || companyId,
      profileName: connectionResult.profileName,
      message: connectionResult.message,
      instanceToken: company.uazapiInstanceToken,
    });
  } catch (err) {
    console.error("[uazapi-status] Error:", err);
    return api.serverError("Erro interno do servidor");
  }
}
