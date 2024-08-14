import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.router.js";
import messageRoutes from "./routes/message.router.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
