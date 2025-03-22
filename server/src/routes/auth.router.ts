import express from "express";
import {
  getMe,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectedRoute.js";

const router = express.Router(); // Create a new router instance

// Route to get the authenticated user's details
// Protected by the `protectRoute` middleware
router.get("/me", protectRoute, getMe);

// Route to handle user signup
router.post("/signup", signup);

// Route to handle user login
router.post("/login", login);

// Route to handle user logout
router.post("/logout", logout);

export default router; // Export the router for use in the application
