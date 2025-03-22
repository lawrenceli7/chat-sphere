import { Response } from "express";
import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as an HTTP-only cookie
const generateToken = (userId: string, res: Response) => {
  // Generate a JWT token with the user ID as the payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d", // Token expiration time set to 7 days
  });

  // Set the token as an HTTP-only cookie in the response
  res.cookie("jwt", token, {
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time set to 7 days
    sameSite: "strict", // Restrict the cookie to same-site requests
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
  });

  return token; // Return the generated token
};

export default generateToken;
