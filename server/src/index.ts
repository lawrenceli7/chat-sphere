import express from "express";
import authRoutes from "./routes/auth.router.js";
import messageRoutes from "./routes/message.router.js";

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
