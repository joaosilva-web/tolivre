// Minimal Uazapi helper for sending plain text messages
const UAZAPI_URL = (process.env.UAZAPI_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);
const UAZAPI_TOKEN =
  process.env.UAZAPI_INSTANCE_TOKEN ||
  process.env.UAZAPI_TOKEN ||
  process.env.UAZAPI_KEY ||
  "";
const UAZAPI_HEADER = process.env.UAZAPI_HEADER || "token"; // e.g. 'token', 'Authorization' or 'apikey'
const UAZAPI_DEFAULT_COUNTRY = (
  process.env.UAZAPI_DEFAULT_COUNTRY || "55"
).replace(/\D/g, "");

export function normalizePhone(p?: string) {
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

export async function sendText(opts: {
  to: string;
  message: string;
  token?: string;
}) {
  const token = opts.token || UAZAPI_TOKEN;
  if (!UAZAPI_URL || !token) {
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
  const maskSecret = (value?: string) => {
    if (!value) return "(missing)";
    if (value.length <= 8) return `${value[0]}***${value[value.length - 1]}`;
    return `${value.slice(0, 4)}...${value.slice(-4)}`;
  };
  let authHeaderKey = "";
  if (UAZAPI_HEADER) {
    if (UAZAPI_HEADER.toLowerCase() === "authorization") {
      headers["Authorization"] = `Bearer ${token}`;
      authHeaderKey = "Authorization";
    } else {
      headers[UAZAPI_HEADER] = token;
      authHeaderKey = UAZAPI_HEADER;
    }
  } else if (opts.token) {
    headers["token"] = token;
    authHeaderKey = "token";
  } else {
    headers["Authorization"] = `Bearer ${token}`;
    authHeaderKey = "Authorization";
  }

  try {
    // If env only provides the base URL, append the send endpoint
    const url = UAZAPI_URL.endsWith("/send/text")
      ? UAZAPI_URL
      : `${UAZAPI_URL}/send/text`;
    console.log("[uazapi] POST", url, JSON.stringify(payload));
    console.log("[uazapi] headers", {
      authHeaderKey,
      token: maskSecret(token),
      accept: "application/json",
      contentType: headers["Content-Type"],
    });
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

export async function sendMenu(opts: {
  to: string;
  text: string;
  choices: string[]; // Formato: "Texto|id"
  footerText?: string;
  token?: string;
}) {
  const token = opts.token || UAZAPI_TOKEN;
  if (!UAZAPI_URL || !token) {
    const msg = "Uazapi not configured (UAZAPI_URL/UAZAPI_TOKEN)";
    console.warn(msg);
    return { ok: false, error: msg } as const;
  }

  const to = normalizePhone(opts.to) || opts.to;
  const payload = {
    number: to,
    type: "button",
    text: opts.text,
    choices: opts.choices,
    footerText: opts.footerText || "",
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const maskSecret = (value?: string) => {
    if (!value) return "(missing)";
    if (value.length <= 8) return `${value[0]}***${value[value.length - 1]}`;
    return `${value.slice(0, 4)}...${value.slice(-4)}`;
  };
  let authHeaderKey = "";
  if (UAZAPI_HEADER) {
    if (UAZAPI_HEADER.toLowerCase() === "authorization") {
      headers["Authorization"] = `Bearer ${token}`;
      authHeaderKey = "Authorization";
    } else {
      headers[UAZAPI_HEADER] = token;
      authHeaderKey = UAZAPI_HEADER;
    }
  } else if (opts.token) {
    headers["token"] = token;
    authHeaderKey = "token";
  } else {
    headers["Authorization"] = `Bearer ${token}`;
    authHeaderKey = "Authorization";
  }

  try {
    const url = UAZAPI_URL.endsWith("/send/menu")
      ? UAZAPI_URL
      : `${UAZAPI_URL}/send/menu`;
    console.log("[uazapi] POST", url, JSON.stringify(payload));
    console.log("[uazapi] headers", {
      authHeaderKey,
      token: maskSecret(token),
      accept: "application/json",
      contentType: headers["Content-Type"],
    });
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

const uazapi = { sendText, sendMenu };
export default uazapi;
