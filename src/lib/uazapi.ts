// Wrapper de compatibilidade retroativa — agora envia via Evolution API auto-hospedada.
// Todos os callers existentes continuam funcionando sem alteração de interface.

import prisma from "@/lib/prisma";
import evolution from "@/lib/evolution";

export { normalizePhone, toBrazilTime } from "@/lib/evolution";

// Instância global de fallback (usada quando a empresa não tem instância própria)
const DEFAULT_INSTANCE = process.env.EVOLUTION_DEFAULT_INSTANCE || "";

async function resolveInstance(companyId?: string): Promise<string | null> {
  if (companyId) {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { uazapiInstanceName: true, uazapiConnected: true },
    });
    if (company?.uazapiConnected && company?.uazapiInstanceName) {
      return company.uazapiInstanceName;
    }
  }
  return DEFAULT_INSTANCE || null;
}

export async function sendText(opts: {
  to: string;
  message: string;
  token?: string; // ignorado (era token do UazAPI)
  companyId?: string;
}) {
  const instanceName = await resolveInstance(opts.companyId);
  if (!instanceName) {
    console.warn("[whatsapp] Nenhuma instância configurada, pulando mensagem");
    return { ok: false as const, error: "Nenhuma instância WhatsApp configurada" };
  }
  return evolution.sendText({ instanceName, to: opts.to, message: opts.message });
}

export async function sendMenu(opts: {
  to: string;
  text: string;
  choices: string[]; // formato "Label|id"
  footerText?: string;
  token?: string; // ignorado
  companyId?: string;
}) {
  const instanceName = await resolveInstance(opts.companyId);
  if (!instanceName) {
    console.warn("[whatsapp] Nenhuma instância configurada, pulando mensagem");
    return { ok: false as const, error: "Nenhuma instância WhatsApp configurada" };
  }

  const buttons = opts.choices.map((c) => {
    const pipeIdx = c.lastIndexOf("|");
    if (pipeIdx === -1) return { id: c, text: c };
    return { id: c.slice(pipeIdx + 1), text: c.slice(0, pipeIdx) };
  });

  return evolution.sendButtons({
    instanceName,
    to: opts.to,
    title: opts.footerText || "TôLivre",
    body: opts.text,
    footer: opts.footerText,
    buttons,
  });
}

const uazapi = { sendText, sendMenu };
export default uazapi;
