import ChatbotIcon from "./ChatbotIcon";

// Defining the Chat interface to represent a chat message
interface Chat {
  role: string; // Role of the message sender (e.g., "user" or "model")
  text: string; // Text content of the message
  isError?: boolean; // Optional flag to indicate if the message is an error
  hideInChat?: boolean; // Optional flag to hide the message from the chat
}

// ChatMessage component definition
const ChatMessage = ({ chat }: { chat: Chat }) => {
  return (
    // Only render the message if it is not hidden
    !chat.hideInChat && (
      <div
        className={`flex items-center ${
          chat.role === "model" ? "justify-start" : "justify-end"
        } ${chat.isError ? "error" : ""}`} // Apply different styles based on the role and error state
      >
        {/* Render the ChatbotIcon if the message is from the "model" */}
        {chat.role === "model" && <ChatbotIcon />}
        <p
          className={`max-w-xs p-3 text-sm rounded-lg ${
            chat.role === "model" ? "bg-purple-100" : "bg-[#3b7bdc] text-white"
          }`} // Apply different styles based on the role
        >
          {chat.text} {/* Display the message text */}
        </p>
      </div>
    )
  );
};

export default ChatMessage;
