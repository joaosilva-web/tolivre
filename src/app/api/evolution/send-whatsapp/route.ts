import { sendWhatsAppText } from "@/lib/evolution";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, text } = body as { to?: string; text?: string };

    if (!to || !text) {
      return new Response(
        JSON.stringify({
          message: "Parâmetros 'to' e 'text' são obrigatórios",
        }),
        { status: 400 }
      );
    }

    const result = await sendWhatsAppText(to, text);
    return new Response(JSON.stringify({ ok: true, result }), { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, message }), {
      status: 500,
    });
  }
}
