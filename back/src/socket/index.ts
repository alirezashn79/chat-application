import { eq } from "drizzle-orm";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import db from "../db";
import { messageSchema, NewMessage } from "../db/schemas/message";
import { userSchema } from "../db/schemas/user";
import { formatDateToCustomISOString } from "../helpers/helper-functions";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const onlineUsers: Record<string, string> = {};

io.on("connect", (socket) => {
  console.log("a user connected", socket.id);

  onlineUsersSocket(socket);

  readMessageSocket(socket);

  isTypingSocket(socket);

  socket.on("disconnect", async () => {
    await disconnectSocket(socket);
  });
});

/* ---------- handler ---------- */
export function sendNewMessageSocket(newMessage: NewMessage) {
  const receiverSocketId = onlineUsers[newMessage.receiverId];
  if (!receiverSocketId) return;
  io.to(receiverSocketId).emit("newMessage", newMessage);
  io.emit("notifications");
}

function onlineUsersSocket(socket: Socket) {
  const userId = socket.handshake.query.userId as string;

  if (userId) {
    onlineUsers[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(onlineUsers));
}

function readMessageSocket(socket: Socket) {
  socket.on("readMessage", async (messageId) => {
    const updatedMessage = await db
      .update(messageSchema)
      .set({ isRead: true })
      .where(eq(messageSchema.id, messageId))
      .returning();

    if (updatedMessage.length > 0) {
      io.emit("readMessageStatus", {
        status: "success",
      });
    }
  });
}

async function disconnectSocket(socket: Socket) {
  const userId = socket.handshake.query.userId as string;
  const now = new Date();
  const lastSeenTime = formatDateToCustomISOString(now);

  const updateLastSeenUser = await db
    .update(userSchema)
    .set({ lastSeenTime })
    .where(eq(userSchema.id, userId))
    .returning();

  if (updateLastSeenUser.length > 0) {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    console.log("a user disconnected", socket.id);
  }
}

function isTypingSocket(socket: Socket) {
  socket.on("startTyping", (receiverId: string) => {
    const userSocket = onlineUsers[receiverId];
    if (!userSocket) return;
    io.to(userSocket).emit("startTypingStatus", {
      status: "active",
    });
  });

  socket.on("stopTyping", (receiverId: string) => {
    const userSocket = onlineUsers[receiverId];
    if (!userSocket) return;
    io.to(userSocket).emit("stopTypingStatus", {
      status: "inactive",
    });
  });
}

export { app, io, server };
