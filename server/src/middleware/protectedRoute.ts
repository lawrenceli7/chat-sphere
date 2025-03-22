import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma.js";

// Interface for the decoded JWT payload
interface DecodedToken extends JwtPayload {
  userId: string; // User ID extracted from the token
}

// Extend the Express Request interface to include the authenticated user
declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string; // User ID
      };
    }
  }
}

// Middleware to protect routes and ensure the user is authenticated
const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt; // Retrieve the JWT token from cookies

    // If no token is provided, return an unauthorized error
    if (!token) {
      return res.status(401).json({
        error:
          "Unauthorized User. You need to be logged in. No token provided.",
      });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // If the token is invalid, return an unauthorized error
    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized User. Invalid token provided.",
      });
    }

    // Find the user in the database using the ID from the decoded token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, fullName: true, username: true, profilePic: true }, // Select specific fields
    });

    // If the user is not found, return a not found error
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Attach the user to the request object for use in subsequent middleware or routes
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error: any) {
    console.log("Error in protectRoute middleware:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error." }); // Return a server error response
  }
};

export default protectRoute;
