import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma.js";

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error:
          "Unauthorized User. You need to be logged in. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized User. Invalid token provided.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, fullName: true, username: true, profilePic: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user;

    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default protectRoute;
