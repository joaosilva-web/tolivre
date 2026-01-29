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
  type: "appointment" | "client" | "payment" | "system";
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
    
    // Em dev: http://localhost:3001
    // Em prod: wss://tolivre.app/ws (path-based routing via Traefik)
    const wsUrl = isDev 
      ? "http://localhost:3001" 
      : `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws`;
    
    console.log(`[WebSocket] Connecting to: ${wsUrl}`);
    
    const socketInstance = io(wsUrl, {
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
    });

    socketInstance.on("appointmentUpdated", (data) => {
      console.log("[WebSocket] Appointment updated:", data);
    });

    socketInstance.on("appointmentCanceled", (data) => {
      console.log("[WebSocket] Appointment canceled:", data);
    });

    socketInstance.on("newClient", (data) => {
      console.log("[WebSocket] New client:", data);
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
