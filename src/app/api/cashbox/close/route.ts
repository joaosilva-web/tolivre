import { NextResponse } from "next/server";

export async function POST() {
	return NextResponse.json(
		{ success: false, error: "Fechamento de caixa ainda não implementado" },
		{ status: 501 },
	);
}
