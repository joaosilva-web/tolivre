import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { parse } from "cookie";
import { verifyToken } from "@/app/libs/auth";

export interface ServerToClientEvents {
  notification: (data: NotificationPayload) => void;
  appointmentCreated: (data: AppointmentNotification) => void;
  appointmentUpdated: (data: AppointmentNotification) => void;
  appointmentCanceled: (data: AppointmentNotification) => void;
  newClient: (data: ClientNotification) => void;
  supportMessage: (data: SupportMessageNotification) => void;
  supportConversationUpdated: (data: SupportConversationUpdate) => void;
}

export interface ClientToServerEvents {
  join: (companyId: string) => void;
  leave: (companyId: string) => void;
}

export interface NotificationPayload {
  id: string;
  type: "appointment" | "client" | "payment" | "system";
  title: string;
  message: string;
  timestamp: string;
  data?: any;
}

export interface AppointmentNotification {
  id: string;
  clientName: string;
  serviceName: string;
  professionalName: string;
  startTime: string;
  action: "created" | "updated" | "canceled";
}

export interface ClientNotification {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface SupportMessageNotification {
  conversationId: string;
  message: {
    id: string;
    content: string;
    senderId: string;
    senderName: string;
    isStaff: boolean;
    createdAt: string;
  };
}

export interface SupportConversationUpdate {
  conversationId: string;
  status?: "OPEN" | "IN_PROGRESS" | "CLOSED";
  assignedToId?: string;
  assignedToName?: string;
  closedAt?: string;
}

let io: SocketIOServer<ClientToServerEvents, ServerToClientEvents> | null =
  null;
const httpServer: HTTPServer | null = null;

// Get current WebSocket instance (may be null in API route workers)
// Next.js 16 uses isolated workers - instrumentation runs in main worker
// API routes run in separate workers and won't have access to the io instance
export function getIO(): SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents
> | null {
  return io;
}

export function initializeWebSocket(server: HTTPServer) {
  if (io) {
    console.log("[WebSocket] Already initialized");
    return io;
  }

  // Add HTTP endpoint for cross-worker communication
  server.on("request", (req, res) => {
    if (req.method === "POST" && req.url === "/emit") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const { companyId, event, data } = JSON.parse(body);

          if (!io) {
            console.error("[WebSocket HTTP] IO not initialized");
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "WebSocket not initialized" }));
            return;
          }

          const roomName = `company:${companyId}`;
          io.to(roomName).emit(event as any, data);

          const roomSize = io.sockets.adapter.rooms.get(roomName)?.size || 0;
          console.log(`[WebSocket HTTP] Emitted ${event} to ${roomName}`, {
            connectedSockets: io.sockets.sockets.size,
            roomSockets: roomSize,
          });

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, roomSockets: roomSize }));
        } catch (error) {
          console.error("[WebSocket HTTP] Error:", error);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid request" }));
        }
      });
      return;
    }
  });

  io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server, {
    path: "/ws/socket.io",
    cors: {
      origin: [
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "http://localhost:3000",
        "https://tolivre.app",
        "https://www.tolivre.app",
      ],
      credentials: true,
    },
  });

  io.on("connection", async (socket: Socket) => {
    console.log("[WebSocket] Client connected:", socket.id);

    // Authenticate user from cookie
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) {
      console.log("[WebSocket] No cookies, disconnecting");
      socket.disconnect();
      return;
    }

    const parsedCookies = parse(cookies);
    const token = parsedCookies.token;

    if (!token) {
      console.log("[WebSocket] No token, disconnecting");
      socket.disconnect();
      return;
    }

    try {
      const user = await verifyToken(token);
      if (!user || !user.companyId) {
        console.log("[WebSocket] Invalid user, disconnecting");
        socket.disconnect();
        return;
      }

      // Store user info in socket
      (socket as any).userId = user.id;
      (socket as any).companyId = user.companyId;

      // Auto-join company room
      const roomName = `company:${user.companyId}`;
      socket.join(roomName);
      console.log(`[WebSocket] User ${user.id} joined room ${roomName}`);

      socket.on("disconnect", () => {
        console.log("[WebSocket] Client disconnected:", socket.id);
      });
    } catch (error) {
      console.error("[WebSocket] Auth error:", error);
      socket.disconnect();
    }
  });

  console.log("[WebSocket] Server initialized");
  return io;
}

// Helper functions to emit events
export function emitToCompany(
  companyId: string,
  event: keyof ServerToClientEvents,
  data: any,
) {
  if (!io) {
    console.warn("[WebSocket] IO not initialized - cannot emit event", event);
    console.warn("[WebSocket] Attempted to emit to company:", companyId);
    console.warn("[WebSocket] Please ensure instrumentation.ts is running");
    return;
  }

  const roomName = `company:${companyId}`;
  io.to(roomName).emit(event as any, data);
  console.log(`[WebSocket] Emitted ${event} to ${roomName}`, {
    connectedSockets: io.sockets.sockets.size,
    roomSockets: io.sockets.adapter.rooms.get(roomName)?.size || 0,
  });
}

export function emitNotification(
  companyId: string,
  notification: NotificationPayload,
) {
  emitToCompany(companyId, "notification", notification);
}

export function emitAppointmentCreated(
  companyId: string,
  appointment: AppointmentNotification,
) {
  emitToCompany(companyId, "appointmentCreated", appointment);

  emitNotification(companyId, {
    id: `apt-${appointment.id}`,
    type: "appointment",
    title: "Novo Agendamento",
    message: `${appointment.clientName} agendou ${appointment.serviceName} com ${appointment.professionalName}`,
    timestamp: new Date().toISOString(),
    data: appointment,
  });
}

export function emitAppointmentUpdated(
  companyId: string,
  appointment: AppointmentNotification,
) {
  emitToCompany(companyId, "appointmentUpdated", appointment);

  emitNotification(companyId, {
    id: `apt-${appointment.id}`,
    type: "appointment",
    title: "Agendamento Atualizado",
    message: `Agendamento de ${appointment.clientName} foi atualizado`,
    timestamp: new Date().toISOString(),
    data: appointment,
  });
}

export function emitAppointmentCanceled(
  companyId: string,
  appointment: AppointmentNotification,
) {
  emitToCompany(companyId, "appointmentCanceled", appointment);

  emitNotification(companyId, {
    id: `apt-${appointment.id}`,
    type: "appointment",
    title: "Agendamento Cancelado",
    message: `Agendamento de ${appointment.clientName} foi cancelado`,
    timestamp: new Date().toISOString(),
    data: appointment,
  });
}

export function emitNewClient(companyId: string, client: ClientNotification) {
  emitToCompany(companyId, "newClient", client);

  emitNotification(companyId, {
    id: `client-${client.id}`,
    type: "client",
    title: "Novo Cliente",
    message: `${client.name} foi adicionado como cliente`,
    timestamp: new Date().toISOString(),
    data: client,
  });
}
