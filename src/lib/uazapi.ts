// Minimal Uazapi helper for sending plain text messages
const UAZAPI_URL = (process.env.UAZAPI_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);
const UAZAPI_TOKEN = process.env.UAZAPI_TOKEN || process.env.UAZAPI_KEY || "";
const UAZAPI_HEADER = process.env.UAZAPI_HEADER || "Authorization"; // e.g. 'Authorization' or 'apikey'
const UAZAPI_DEFAULT_COUNTRY = (
  process.env.UAZAPI_DEFAULT_COUNTRY || "55"
).replace(/\D/g, "");

function normalizePhone(p?: string) {
  if (!p) return undefined;
  let d = String(p).replace(/\D/g, "");
  if (!d) return undefined;
  if (
    UAZAPI_DEFAULT_COUNTRY &&
    !d.startsWith(UAZAPI_DEFAULT_COUNTRY) &&
    d.length <= 11
  ) {
    d = `${UAZAPI_DEFAULT_COUNTRY}${d}`;
  }
  return d;
}

export async function sendText(opts: { to: string; message: string }) {
  if (!UAZAPI_URL || !UAZAPI_TOKEN) {
    const msg = "Uazapi not configured (UAZAPI_URL/UAZAPI_TOKEN)";
    console.warn(msg);
    return { ok: false, error: msg } as const;
  }

  const to = normalizePhone(opts.to) || opts.to;
  // Uazapi expects { number, text }
  const payload = { number: to, text: opts.message };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (UAZAPI_HEADER && UAZAPI_HEADER.toLowerCase() === "authorization") {
    headers["Authorization"] = `Bearer ${UAZAPI_TOKEN}`;
  } else {
    headers[UAZAPI_HEADER] = UAZAPI_TOKEN;
  }

  try {
    // UAZAPI_URL is expected to be the full endpoint (e.g. https://free.uazapi.com/send/text)
    const url = UAZAPI_URL;
    console.log("[uazapi] POST", url, JSON.stringify(payload));
    // Ensure Accept header and Content-Type are present
    headers["Accept"] = "application/json";
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const text = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("[uazapi] API error", res.status, text);
      return { ok: false, status: res.status, body: text } as const;
    }
    try {
      const json = JSON.parse(text || "{}");
      return { ok: true, status: res.status, body: json } as const;
    } catch {
      return { ok: true, status: res.status, body: text } as const;
    }
  } catch (err) {
    console.error("[uazapi] Failed to call API:", err);
    return { ok: false, error: String(err) } as const;
  }
}

const uazapi = { sendText };
export default uazapi;
