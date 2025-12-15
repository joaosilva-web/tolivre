import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "baileys";
import type { AnyMessageContent } from "baileys";

let sock: ReturnType<typeof makeWASocket> | null = null;
let initPromise: Promise<void> | null = null;

const AUTH_PATH = process.env.WHATSAPP_AUTH_PATH || "data/whatsapp_auth";
const PRINT_QR = (process.env.WHATSAPP_PRINT_QR || "0") === "1";

export async function initWhatsApp() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_PATH);

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: PRINT_QR,
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update: any) => {
      const { connection, lastDisconnect } = update;
      if (connection === "open") {
        console.log("[whatsapp] connected");
      } else if (connection === "close") {
        const code = (lastDisconnect?.error as any)?.output?.statusCode;
        console.log("[whatsapp] disconnected", code);
        // automatic reconnect handled by library, but you can restart here if needed
      }
    });

    sock.ev.on("messages.upsert", (msg: any) => {
      // simple logging for incoming messages
      try {
        // messages.upsert payload contains messages array
        const messages = msg.messages || [];
        for (const m of messages) {
          console.log(
            "[whatsapp] message upsert",
            m.key?.remoteJid,
            m.message ? Object.keys(m.message) : null
          );
        }
      } catch (err) {
        console.error("[whatsapp] error processing upsert", err);
      }
    });
  })();

  return initPromise;
}

function ensureSock() {
  if (!sock)
    throw new Error(
      "WhatsApp socket not initialized. Call initWhatsApp() first."
    );
  return sock;
}

export async function sendMessage(to: string, content: AnyMessageContent) {
  await initWhatsApp();
  const s = ensureSock();
  // `to` should be full JID (like '5511999999999@s.whatsapp.net') or plain phone number
  const jid = to.includes("@") ? to : `${to}@s.whatsapp.net`;
  return s.sendMessage(jid, content);
}

export async function sendText(to: string, text: string) {
  return sendMessage(to, { text });
}

export function getSocketInstance() {
  return sock;
}

export default {
  initWhatsApp,
  sendMessage,
  sendText,
  getSocketInstance,
};
