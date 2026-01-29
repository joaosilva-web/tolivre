import { type NextRequest } from "next/server";
import { getIO } from "@/lib/websocket";

// This route handles Socket.IO connections
// Socket.IO will automatically handle the handshake and upgrade to WebSocket

export async function GET(req: NextRequest) {
  const io = getIO();

  if (!io) {
    // Return a simple response - Socket.IO will handle this via polling
    return new Response("Socket.IO server not ready", {
      status: 503,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // Socket.IO handles its own protocol, this is just a fallback
  return new Response("Socket.IO server running", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export async function POST(req: NextRequest) {
  // Socket.IO uses POST for polling transport
  const io = getIO();

  if (!io) {
    return new Response("Socket.IO server not ready", { status: 503 });
  }

  return new Response("OK", { status: 200 });
}
