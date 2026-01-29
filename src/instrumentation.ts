export async function register() {
  // Only run in Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Server } = await import("http");
    const { initializeWebSocket } = await import("@/lib/websocket");

    console.log("[Instrumentation] Initializing WebSocket server...");

    // Create HTTP server for WebSocket
    const httpServer = new Server();
    initializeWebSocket(httpServer);

    // Listen on port 3001 on all interfaces (0.0.0.0 for Docker)
    const wsPort = parseInt(process.env.WS_PORT || "3001");
    httpServer.listen(wsPort, "0.0.0.0", () => {
      console.log(`[WebSocket] Server listening on 0.0.0.0:${wsPort}`);
    });
  }
}
