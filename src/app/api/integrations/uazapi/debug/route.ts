import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";

// This debug endpoint will try calling the Uazapi /instance/init with multiple header variants
// to help diagnose 401 Unauthorized responses. It does not perform any destructive action;
// it will call the endpoint with a minimal payload and return the status and response body
// for each header variation.

export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    const UAZAPI_BASE_URL =
      process.env.UAZAPI_URL?.replace(/\/send\/text$/, "") ||
      "https://free.uazapi.com";
    const UAZAPI_TOKEN = process.env.UAZAPI_TOKEN || "";
    if (!UAZAPI_TOKEN)
      return api.serverError("UAZAPI_TOKEN not configured in environment.");

    const testUrl = `${UAZAPI_BASE_URL}/instance/init`;
    const payload = {
      instanceName: `tolivre-debug-${Date.now()}`,
      qrcode: false,
    };

    const headerVariants: { name: string; headers: Record<string, string> }[] =
      [
        {
          name: "admintoken-lower",
          headers: {
            Accept: "application/json",
            admintoken: UAZAPI_TOKEN,
            "Content-Type": "application/json",
          },
        },
        {
          name: "Authorization-bearer",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${UAZAPI_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
        {
          name: "both",
          headers: {
            Accept: "application/json",
            admintoken: UAZAPI_TOKEN,
            Authorization: `Bearer ${UAZAPI_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
        {
          name: "adminToken-camel",
          headers: {
            Accept: "application/json",
            adminToken: UAZAPI_TOKEN,
            "Content-Type": "application/json",
          },
        },
        {
          name: "admintoken-upper",
          headers: {
            Accept: "application/json",
            ADMINTOKEN: UAZAPI_TOKEN,
            "Content-Type": "application/json",
          },
        },
      ];

    const results: Array<Record<string, unknown>> = [];

    for (const variant of headerVariants) {
      try {
        const res = await fetch(testUrl, {
          method: "POST",
          headers: variant.headers,
          body: JSON.stringify(payload),
        });
        const text = await res.text().catch(() => "");
        const headersObj: Record<string, string> = {};
        try {
          res.headers.forEach((v, k) => {
            headersObj[k] = v;
          });
        } catch {}

        results.push({
          variant: variant.name,
          status: res.status,
          body: (() => {
            try {
              return JSON.parse(text || "{}");
            } catch {
              return text;
            }
          })(),
          responseHeaders: headersObj,
        });
      } catch (err) {
        results.push({ variant: variant.name, error: String(err) });
      }
    }

    // Mask token in returned metadata
    const mask = (s: string) =>
      s.length > 8 ? `${s.slice(0, 4)}...${s.slice(-4)}` : s;

    return api.ok({
      testedUrl: testUrl,
      tokenMask: mask(UAZAPI_TOKEN),
      results,
    });
  } catch (err) {
    console.error("[uazapi-debug] Error:", err);
    return api.serverError("Erro interno ao executar debug");
  }
}
