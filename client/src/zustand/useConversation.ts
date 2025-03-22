import { create } from "zustand";

// Type definition for a conversation
export type ConversationType = {
  id: string; // Unique identifier for the conversation
  fullName: string; // Full name of the user in the conversation
  profilePic: string; // URL of the user's profile picture
};

// Type definition for a message
export type MessageType = {
  id: string; // Unique identifier for the message
  body: string; // Content of the message
  senderId: string; // ID of the sender
  createdAt: string; // Timestamp of when the message was created
  shouldShake?: boolean; // Optional flag to indicate if the message should "shake" (e.g., for notifications)
};

// Interface defining the state structure for conversations
interface ConversationState {
  selectedConversation: ConversationType | null; // Currently selected conversation
  messages: MessageType[]; // List of messages in the selected conversation
  setSelectedConversation: (conversation: ConversationType | null) => void; // Function to update the selected conversation
  setMessages: (messages: MessageType[]) => void; // Function to update the list of messages
}

// Zustand store for managing conversation state
const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null, // Initial state for the selected conversation
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }), // Update the selected conversation
  messages: [], // Initial state for the messages
  setMessages: (messages) => set({ messages: messages }), // Update the messages
}));

export default useConversation;
