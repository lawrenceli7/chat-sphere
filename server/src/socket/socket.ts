import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express(); // Create an Express application

// Create an HTTP server and attach the Express app
const server = http.createServer(app);

// Create a new Socket.IO server and configure CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost.5173"], // Allow requests from the frontend's origin
    methods: ["GET", "POST"], // Allow GET and POST methods
  },
});

// Utility function to get the socket ID of a specific user
export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId]; // Return the socket ID of the user
};

// Map to store the relationship between user IDs and their socket IDs
const userSocketMap: { [key: string]: string } = {};

// Listen for new socket connections
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string; // Get the user ID from the socket handshake query

  if (userId) userSocketMap[userId] = socket.id; // Map the user ID to the socket ID

  // Emit the list of online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Listen for socket disconnection
  socket.on("disconnect", () => {
    delete userSocketMap[userId]; // Remove the user from the map
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update the list of online users
  });
});

export { app, io, server };
