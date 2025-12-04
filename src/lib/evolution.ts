// src/lib/evolution.ts
// Cliente básico para Evolution API (env: EVOLUTION_API_URL, EVOLUTION_API_KEY)

type EvolutionResponse = unknown;

const EVOLUTION_API_URL =
  process.env.EVOLUTION_API_URL || "http://localhost:8080";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

function ensureKey() {
  if (!EVOLUTION_API_KEY) throw new Error("EVOLUTION_API_KEY is not set");
}

export async function sendWhatsAppText(
  to: string,
  body: string
): Promise<EvolutionResponse> {
  ensureKey();
  const url = `${EVOLUTION_API_URL.replace(/\/$/, "")}/v1/messages`;

  const payload = {
    channel: "whatsapp",
    to,
    type: "text",
    text: { body },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${EVOLUTION_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const textRes = await res.text();
    throw new Error(`Evolution API error: ${res.status} ${textRes}`);
  }

  return res.json();
}

const evolutionClient = { sendWhatsAppText };
export default evolutionClient;
