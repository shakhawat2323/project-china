"use client";

import { io, type Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_ORIGIN || "http://localhost:5000";

let socket: Socket | null = null;

export type RealtimeEvents = {
  "notification:new": unknown;
  "notification:read": { notificationId: string };
  "notification:read-all": { userId: string };
  "order:status-updated": unknown;
  "order:cancelled": unknown;
  "ticket:reply": unknown;
  "ticket:closed": unknown;
  "chat:room-created": unknown;
  "chat:message": unknown;
  "chat:typing": { roomId: string; userId: string; isTyping: boolean };
  "chat:seen": { roomId: string; seenById: string };
  "chat:closed": unknown;
  "presence:update": { userId: string; isOnline: boolean };
};

export const RealtimeService = {
  connect: (accessToken: string) => {
    if (socket?.connected) {
      return socket;
    }

    socket = io(SOCKET_URL, {
      withCredentials: true,
      auth: {
        token: accessToken,
      },
      transports: ["websocket", "polling"],
    });

    return socket;
  },

  disconnect: () => {
    socket?.disconnect();
    socket = null;
  },

  getSocket: () => socket,

  on: <K extends keyof RealtimeEvents>(eventName: K, handler: (payload: RealtimeEvents[K]) => void) => {
    socket?.on(eventName as string, handler as (...args: unknown[]) => void);
  },

  off: <K extends keyof RealtimeEvents>(eventName: K, handler?: (payload: RealtimeEvents[K]) => void) => {
    socket?.off(eventName as string, handler as (...args: unknown[]) => void);
  },

  joinChat: (roomId: string) => {
    socket?.emit("chat:join", roomId);
  },

  leaveChat: (roomId: string) => {
    socket?.emit("chat:leave", roomId);
  },

  sendTyping: (roomId: string, isTyping: boolean) => {
    socket?.emit("chat:typing", { roomId, isTyping });
  },

  joinOrder: (orderId: string) => {
    socket?.emit("order:join", orderId);
  },

  leaveOrder: (orderId: string) => {
    socket?.emit("order:leave", orderId);
  },
};
