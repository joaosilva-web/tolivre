"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import useSession from "@/hooks/useSession";

interface NotificationPayload {
  id: string;
  type: "appointment" | "client" | "payment" | "system" | "support";
  title: string;
  message: string;
  timestamp: string;
  data?: any;
}

interface WebSocketContextValue {
  socket: Socket | null;
  connected: boolean;
  notifications: NotificationPayload[];
  clearNotifications: () => void;
  removeNotification: (id: string) => void;
}

const WebSocketContext = createContext<WebSocketContextValue>({
  socket: null,
  connected: false,
  notifications: [],
  clearNotifications: () => {},
  removeNotification: () => {},
});

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const { user } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);

  useEffect(() => {
    if (!user?.companyId) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
      return;
    }

    // Initialize socket connection
    const isDev = process.env.NODE_ENV === "development";

    // Em dev: http://localhost:3001 com path padrão /socket.io
    // Em prod: wss://tolivre.app/ws (path-based routing via Traefik)
    const wsUrl = isDev
      ? "http://localhost:3001"
      : `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}`;

    const wsPath = isDev ? "/socket.io" : "/ws/socket.io";

    console.log(`[WebSocket] Connecting to: ${wsUrl} (path: ${wsPath})`);

    const socketInstance = io(wsUrl, {
      path: wsPath,
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      timeout: 20000,
    });

    socketInstance.on("connect", () => {
      console.log("[WebSocket] Connected");
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("[WebSocket] Disconnected");
      setConnected(false);
    });

    socketInstance.on("notification", (data: NotificationPayload) => {
      console.log("[WebSocket] Notification received:", data);
      setNotifications((prev) => [data, ...prev].slice(0, 50)); // Keep last 50

      // Show browser notification if permitted
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification(data.title, {
          body: data.message,
          icon: "/favicon.ico",
        });
      }
    });

    socketInstance.on("appointmentCreated", (data) => {
      console.log("[WebSocket] Appointment created:", data);

      // Add to notifications list
      const notification: NotificationPayload = {
        id: `appointment-created-${data.id}`,
        type: "appointment",
        title: "Novo Agendamento",
        message: `${data.clientName} agendou ${data.serviceName}`,
        timestamp: new Date().toISOString(),
      };

      setNotifications((prev) => [notification, ...prev]);

      // Browser notification
      if (typeof window !== "undefined" && "Notification" in window) {
        if (window.Notification.permission === "granted") {
          new window.Notification("Novo Agendamento", {
            body: notification.message,
            icon: "/favicon.ico",
          });
        }
      }
    });

    socketInstance.on("appointmentUpdated", (data) => {
      console.log("[WebSocket] Appointment updated:", data);

      const notification: NotificationPayload = {
        id: `appointment-updated-${data.id}`,
        type: "appointment",
        title: "Agendamento Atualizado",
        message: `Agendamento de ${data.clientName} foi atualizado`,
        timestamp: new Date().toISOString(),
      };

      setNotifications((prev) => [notification, ...prev]);

      if (typeof window !== "undefined" && "Notification" in window) {
        if (window.Notification.permission === "granted") {
          new window.Notification("Agendamento Atualizado", {
            body: notification.message,
            icon: "/favicon.ico",
          });
        }
      }
    });

    socketInstance.on("appointmentCanceled", (data) => {
      console.log("[WebSocket] Appointment canceled:", data);

      const notification: NotificationPayload = {
        id: `appointment-canceled-${data.id}`,
        type: "appointment",
        title: "Agendamento Cancelado",
        message: `${data.clientName} cancelou o agendamento de ${data.serviceName}`,
        timestamp: new Date().toISOString(),
      };

      setNotifications((prev) => [notification, ...prev]);

      if (typeof window !== "undefined" && "Notification" in window) {
        if (window.Notification.permission === "granted") {
          new window.Notification("Agendamento Cancelado", {
            body: notification.message,
            icon: "/favicon.ico",
          });
        }
      }
    });

    socketInstance.on("newClient", (data) => {
      console.log("[WebSocket] New client:", data);
    });

    // Support chat listeners
    socketInstance.on("supportMessage", (data: any) => {
      console.log("[WebSocket] Support message received:", data);

      // Criar notificação se for mensagem do staff para usuário ou vice-versa
      const isStaffUser = user?.email?.endsWith("@tolivre.app");
      const shouldNotify = isStaffUser
        ? !data.message.isStaff
        : data.message.isStaff;

      if (shouldNotify) {
        const notification: NotificationPayload = {
          id: `support-message-${data.message.id}`,
          type: "support",
          title: isStaffUser
            ? "Nova mensagem de suporte"
            : "Resposta do suporte",
          message: data.message.content.substring(0, 100),
          timestamp: new Date().toISOString(),
          data: { conversationId: data.conversationId },
        };

        setNotifications((prev) => [notification, ...prev]);

        if (typeof window !== "undefined" && "Notification" in window) {
          if (window.Notification.permission === "granted") {
            new window.Notification(notification.title, {
              body: notification.message,
              icon: "/favicon.ico",
            });
          }
        }
      }
    });

    socketInstance.on("supportConversationUpdated", (data: any) => {
      console.log("[WebSocket] Support conversation updated:", data);
    });

    setSocket(socketInstance);

    // Request notification permission
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }

    return () => {
      socketInstance.disconnect();
    };
  }, [user?.companyId]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        connected,
        notifications,
        clearNotifications,
        removeNotification,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }
  return context;
}
