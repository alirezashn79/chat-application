import http from "http";
import express from "express";
import { Server } from "socket.io";
import { NewMessage } from "../db/schemas/message";

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

  const userId = socket.handshake.query.userId as string;

  if (userId) {
    onlineUsers[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export function sendNewMessageSocket(newMessage: NewMessage) {
  const receiverSocketId = onlineUsers[newMessage.receiverId];
  if (!receiverSocketId) throw new Error("socket error -> newMessage");
  io.to(receiverSocketId).emit("newMessage", newMessage);
}

export { app, server, io };
