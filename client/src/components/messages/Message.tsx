import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/time";
import useConversation, { MessageType } from "../../zustand/useConversation";

// Message component definition
const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext(); // Get the authenticated user
  const { selectedConversation } = useConversation(); // Get the selected conversation

  // Determine if the message is sent by the authenticated user
  const fromMe = message?.senderId === authUser?.id;

  // Set the profile picture based on the sender
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;

  // Set CSS classes for alignment and styling
  const chatClass = fromMe ? "chat-end" : "chat-start"; // Align message based on sender
  const bubbleBg = fromMe ? "bg-blue-500" : ""; // Background color for the message bubble
  const shakeClass = message.shouldShake ? "shake" : ""; // Add shake animation if applicable

  return (
    <div className={`chat ${chatClass}`}>
      {/* Display the sender's profile picture */}
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 rounded-full md:w-10">
          <img alt="Chat Bubble" src={img} />
        </div>
      </div>

      {/* Display the message body */}
      <p
        className={`chat-bubble text-white ${bubbleBg} ${shakeClass} text-sm md:text-md`}
      >
        {message.body}
      </p>

      {/* Display the message timestamp */}
      <span className="flex items-center gap-1 text-xs text-white opacity-50 chat-footer">
        {extractTime(message.createdAt)}{" "}
        {/* Format and display the message time */}
      </span>
    </div>
  );
};

export default Message;
