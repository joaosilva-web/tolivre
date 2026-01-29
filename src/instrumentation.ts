export async function register() {
  // Only run WebSocket server in development
  // In production (Dokploy), WebSocket is not supported without custom server
  // The app will work without real-time notifications in prod
  if (process.env.NODE_ENV === "development" && process.env.NEXT_RUNTIME === "nodejs") {
    const { Server } = await import("http");
    const { initializeWebSocket } = await import("@/lib/websocket");
    
    console.log("[Instrumentation] Initializing WebSocket server (dev only)...");
    
    // Create HTTP server for WebSocket
    const httpServer = new Server();
    initializeWebSocket(httpServer);
    
    // Listen on port 3001 in development
    const wsPort = 3001;
    httpServer.listen(wsPort, "0.0.0.0", () => {
      console.log(`[WebSocket] Server listening on 0.0.0.0:${wsPort} (dev only)`);
    });
  }
}
