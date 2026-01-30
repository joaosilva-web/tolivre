/**
 * WebSocket HTTP Emitter
 *
 * Since Next.js 16 uses isolated workers, API routes cannot directly access
 * the WebSocket server instance. This module provides HTTP-based communication
 * to emit events from any worker to the WebSocket server.
 */

import type {
  NotificationPayload,
  AppointmentNotification,
  ClientNotification,
  SupportMessageNotification,
  SupportConversationUpdate,
} from "./websocket";

const WS_PORT = process.env.WS_PORT || "3001";
const WS_URL = `http://localhost:${WS_PORT}/emit`;

/**
 * Emit an event to the WebSocket server via HTTP
 * This works across Next.js worker processes
 */
async function emitViaHTTP(
  companyId: string,
  event: string,
  data: any,
): Promise<boolean> {
  try {
    const response = await fetch(WS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyId,
        event,
        data,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[WebSocket Emit] HTTP error:", error);
      return false;
    }

    const result = await response.json();
    console.log(`[WebSocket Emit] Success: ${event} to company:${companyId}`, {
      roomSockets: result.roomSockets,
    });
    return true;
  } catch (error) {
    console.error("[WebSocket Emit] Failed to emit:", error);
    return false;
  }
}

// Notification helpers
export async function emitNotification(
  companyId: string,
  notification: NotificationPayload,
): Promise<boolean> {
  return emitViaHTTP(companyId, "notification", notification);
}

export async function emitAppointmentCreated(
  companyId: string,
  appointment: AppointmentNotification,
): Promise<boolean> {
  return emitViaHTTP(companyId, "appointmentCreated", appointment);
}

export async function emitAppointmentUpdated(
  companyId: string,
  appointment: AppointmentNotification,
): Promise<boolean> {
  return emitViaHTTP(companyId, "appointmentUpdated", appointment);
}

export async function emitAppointmentCanceled(
  companyId: string,
  appointment: AppointmentNotification,
): Promise<boolean> {
  return emitViaHTTP(companyId, "appointmentCanceled", appointment);
}

export async function emitNewClient(
  companyId: string,
  client: ClientNotification,
): Promise<boolean> {
  return emitViaHTTP(companyId, "newClient", client);
}

// Support chat helpers
export async function emitSupportMessage(
  companyId: string,
  message: SupportMessageNotification,
): Promise<boolean> {
  return emitViaHTTP(companyId, "supportMessage", message);
}

export async function emitSupportConversationUpdated(
  companyId: string,
  update: SupportConversationUpdate,
): Promise<boolean> {
  return emitViaHTTP(companyId, "supportConversationUpdated", update);
}
