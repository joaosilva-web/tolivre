// Evolution API client — self-hosted, multi-instance WhatsApp
// Docs: https://doc.evolution-api.com

const EVOLUTION_URL = (
  process.env.EVOLUTION_API_URL || "http://localhost:8080"
).replace(/\/$/, "");
const EVOLUTION_KEY = process.env.EVOLUTION_API_KEY || "";

function authHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    apikey: EVOLUTION_KEY,
  };
}

export function normalizePhone(p?: string): string | undefined {
  if (!p) return undefined;
  let d = String(p).replace(/\D/g, "");
  if (!d) return undefined;
  if (!d.startsWith("55") && d.length <= 11) d = `55${d}`;
  return d;
}

export function toBrazilTime(utcDate: Date): Date {
  return new Date(utcDate.getTime() + -3 * 60 * 60 * 1000);
}

// ─── Instance Management ────────────────────────────────────────────────────

export async function createInstance(
  instanceName: string,
  webhookUrl?: string,
) {
  const payload: Record<string, unknown> = {
    instanceName,
    qrcode: true,
    integration: "WHATSAPP-BAILEYS",
  };

  if (webhookUrl) {
    payload.webhook = {
      enabled: true,
      url: webhookUrl,
      byEvents: true,
      base64: false,
      events: ["MESSAGES_UPSERT", "CONNECTION_UPDATE", "QRCODE_UPDATED"],
    };
  }

  const res = await fetch(`${EVOLUTION_URL}/instance/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("[evolution] createInstance error", res.status, text);
    return { ok: false as const, status: res.status, body: text };
  }
  return { ok: true as const, status: res.status, body: JSON.parse(text) };
}

export async function getQRCode(instanceName: string) {
  const res = await fetch(
    `${EVOLUTION_URL}/instance/connect/${instanceName}`,
    { method: "GET", headers: authHeaders() },
  );

  const text = await res.text();
  if (!res.ok) {
    console.error("[evolution] getQRCode error", res.status, text);
    return { ok: false as const, qrCode: null as string | null, status: res.status };
  }
  const data = JSON.parse(text);
  return {
    ok: true as const,
    qrCode: (data.base64 || data.code || data.qrcode || null) as string | null,
    status: res.status,
    body: data,
  };
}

export async function getInstanceStatus(instanceName: string) {
  const res = await fetch(
    `${EVOLUTION_URL}/instance/connectionState/${instanceName}`,
    { method: "GET", headers: authHeaders() },
  );

  const text = await res.text();
  if (!res.ok) {
    return {
      ok: false as const,
      connected: false,
      state: "unknown",
      profileName: null as string | null,
      status: res.status,
    };
  }

  const data = JSON.parse(text);
  const state: string = data?.instance?.state || data?.state || "unknown";
  return {
    ok: true as const,
    connected: state === "open",
    state,
    profileName: (data?.instance?.profileName || null) as string | null,
    status: res.status,
  };
}

export async function logoutInstance(instanceName: string) {
  const res = await fetch(
    `${EVOLUTION_URL}/instance/logout/${instanceName}`,
    { method: "DELETE", headers: authHeaders() },
  );
  return { ok: res.ok, status: res.status };
}

export async function deleteInstance(instanceName: string) {
  const res = await fetch(
    `${EVOLUTION_URL}/instance/delete/${instanceName}`,
    { method: "DELETE", headers: authHeaders() },
  );
  return { ok: res.ok, status: res.status };
}

// ─── Messaging ──────────────────────────────────────────────────────────────

export async function sendText(opts: {
  instanceName: string;
  to: string;
  message: string;
}) {
  if (!EVOLUTION_KEY || !EVOLUTION_URL) {
    return { ok: false as const, error: "Evolution API não configurada" };
  }

  const to = normalizePhone(opts.to) || opts.to;

  const res = await fetch(
    `${EVOLUTION_URL}/message/sendText/${opts.instanceName}`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ number: to, text: opts.message }),
    },
  );

  const text = await res.text();
  if (!res.ok) {
    console.error("[evolution] sendText error", res.status, text);
    return { ok: false as const, status: res.status, body: text };
  }
  try {
    return { ok: true as const, status: res.status, body: JSON.parse(text) };
  } catch {
    return { ok: true as const, status: res.status, body: text };
  }
}

export async function sendButtons(opts: {
  instanceName: string;
  to: string;
  title: string;
  body: string;
  footer?: string;
  buttons: Array<{ id: string; text: string }>;
}) {
  if (!EVOLUTION_KEY || !EVOLUTION_URL) {
    return { ok: false as const, error: "Evolution API não configurada" };
  }

  const to = normalizePhone(opts.to) || opts.to;

  const payload = {
    number: to,
    title: opts.title,
    description: opts.body,
    footer: opts.footer || "",
    buttons: opts.buttons.map((b) => ({
      type: "reply",
      displayText: b.text,
      id: b.id,
    })),
  };

  const res = await fetch(
    `${EVOLUTION_URL}/message/sendButtons/${opts.instanceName}`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    },
  );

  const text = await res.text();

  if (!res.ok) {
    // Fallback: send as plain text with numbered choices
    console.warn("[evolution] sendButtons failed, usando fallback texto", res.status);
    const choicesText = opts.buttons
      .map((b, i) => `${i + 1}. ${b.text}`)
      .join("\n");
    return sendText({
      instanceName: opts.instanceName,
      to: opts.to,
      message: `${opts.body}\n\n${choicesText}`,
    });
  }

  try {
    return { ok: true as const, status: res.status, body: JSON.parse(text) };
  } catch {
    return { ok: true as const, status: res.status, body: text };
  }
}

const evolution = {
  sendText,
  sendButtons,
  normalizePhone,
  toBrazilTime,
  createInstance,
  getQRCode,
  getInstanceStatus,
  logoutInstance,
  deleteInstance,
};
export default evolution;
