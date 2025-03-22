import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Controller to send a message
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body; // Extract the message content from the request body
    const { id: receiverId } = req.params; // Extract the receiver's ID from the request parameters
    const senderId = req.user.id; // Get the sender's ID from the authenticated user

    // Find an existing conversation between the sender and receiver
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId], // Check if both participants are in the conversation
        },
      },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId], // Set the participants for the new conversation
          },
        },
      });
    }

    // Create a new message in the conversation
    const newMessage = await prisma.message.create({
      data: {
        senderId, // Set the sender's ID
        body: message, // Set the message content
        conversationId: conversation.id, // Link the message to the conversation
      },
    });

    // Update the conversation to include the new message
    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id, // Connect the new message to the conversation
            },
          },
        },
      });
    }

    // Get the receiver's socket ID for real-time communication
    const receiverSocketId = getReceiverSocketId(receiverId);

    // If the receiver is online, emit the new message to their socket
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage); // Respond with the newly created message
  } catch (error: any) {
    console.log("Error in sendMessage controller:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error." }); // Respond with an error message
  }
};

// Controller to get messages for a conversation
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params; // Extract the ID of the user to chat with
    const senderId = req.user.id; // Get the sender's ID from the authenticated user

    // Find the conversation between the sender and the other user
    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId], // Check if both participants are in the conversation
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc", // Order messages by creation time in ascending order
          },
        },
      },
    });

    // If no conversation exists, return an empty array
    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages); // Respond with the messages in the conversation
  } catch (error: any) {
    console.log("Error in getMessages controller:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error." }); // Respond with an error message
  }
};

// Controller to get users for the sidebar
export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user.id; // Get the authenticated user's ID

    // Find all users except the authenticated user
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId, // Exclude the authenticated user
        },
      },
      select: {
        id: true, // Include the user's ID
        fullName: true, // Include the user's full name
        profilePic: true, // Include the user's profile picture
      },
    });

    res.status(200).json(users); // Respond with the list of users
  } catch (error: any) {
    console.log("Error in getUsersForSidebar controller:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error." }); // Respond with an error message
  }
};
