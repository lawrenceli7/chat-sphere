import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectedRoute.js";

const router = express.Router(); // Create a new router instance

// Route to get all users for the sidebar (excluding the authenticated user)
// Protected by the `protectRoute` middleware
router.get("/conversations", protectRoute, getUsersForSidebar);

// Route to get messages for a specific conversation
// Protected by the `protectRoute` middleware
router.get("/:id", protectRoute, getMessages);

// Route to send a message in a specific conversation
// Protected by the `protectRoute` middleware
router.post("/send/:id", protectRoute, sendMessage);

export default router;
