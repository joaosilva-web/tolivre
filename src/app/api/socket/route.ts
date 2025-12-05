import { NextRequest, NextResponse } from "next/server";
import { getIO, initializeWebSocket } from "@/lib/websocket";

export async function GET(req: NextRequest) {
  // This endpoint is for Socket.IO polling transport
  // Socket.IO will handle the upgrade to WebSocket automatically
  
  const io = getIO();
  
  if (!io) {
    return NextResponse.json(
      { error: "WebSocket server not initialized" },
      { status: 503 }
    );
  }

  return NextResponse.json({ status: "ok", transport: "websocket" });
}
