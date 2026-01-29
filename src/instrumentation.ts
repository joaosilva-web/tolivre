import { createServer } from "http";
import { initializeWebSocket } from "@/lib/websocket";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("[Instrumentation] Initializing WebSocket server...");
    
    // Create HTTP server and initialize WebSocket
    const httpServer = createServer();
    initializeWebSocket(httpServer);
    
    // Start listening on a separate port for WebSocket
    const port = process.env.WS_PORT || 3001;
    httpServer.listen(port, () => {
      console.log(`[WebSocket] Server listening on port ${port}`);
    });
  }
}
