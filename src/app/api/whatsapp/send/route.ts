import { NextResponse } from "next/server";
import { sendText, initWhatsApp } from "../../../../lib/whatsapp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, text } = body || {};
    if (!to || !text) {
      return NextResponse.json(
        { success: false, error: "Missing `to` or `text` in body" },
        { status: 400 }
      );
    }

    // ensure whatsapp initialized
    await initWhatsApp();

    await sendText(to, text);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/whatsapp/send] error", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
