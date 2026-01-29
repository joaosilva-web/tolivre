export async function register() {
  // Only run in Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { createServer } = await import("http");
    const { initializeWebSocket } = await import("@/lib/websocket");

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
