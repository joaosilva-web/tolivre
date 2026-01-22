import { NextResponse } from "next/server";

export async function POST() {
	return NextResponse.json(
		{ success: false, error: "Lançamento de entrada ainda não implementado" },
		{ status: 501 },
	);
}
