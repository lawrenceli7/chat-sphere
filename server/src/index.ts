import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import job from "./cron.js";
import authRoutes from "./routes/auth.router.js";
import messageRoutes from "./routes/message.router.js";
import { app, server } from "./socket/socket.js";

dotenv.config(); // Load environment variables from the .env file
job.start(); // Start the cron job

const PORT = process.env.PORT || 5000; // Define the server port, defaulting to 5000
const __dirname = path.resolve(); // Resolve the current directory path

// Middleware to parse cookies
app.use(cookieParser());
// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes for authentication and messages
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve static files in production
if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/client/dist"))); // Serve the frontend's static files
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html")); // Serve the frontend's index.html for all unmatched routes
  });
}

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log("Server running on port " + PORT); // Log a message when the server starts
});
