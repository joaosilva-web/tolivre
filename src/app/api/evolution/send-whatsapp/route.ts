import { sendText } from "@/lib/evolution";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { instanceName, to, text } = body as {
      instanceName?: string;
      to?: string;
      text?: string;
    };

    if (!instanceName || !to || !text) {
      return new Response(
        JSON.stringify({ message: "Parâmetros 'instanceName', 'to' e 'text' são obrigatórios" }),
        { status: 400 },
      );
    }

    const result = await sendText({ instanceName, to, message: text });
    return new Response(JSON.stringify({ ok: true, result }), { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, message }), { status: 500 });
  }
}
