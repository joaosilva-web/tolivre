import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Endpoint de caixa ainda não implementado" },
    { status: 501 },
  );
}
