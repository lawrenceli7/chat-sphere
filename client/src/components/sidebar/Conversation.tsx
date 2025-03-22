import { useSocketContext } from "../../context/SocketContext";
import useConversation, {
  ConversationType,
} from "../../zustand/useConversation";

// Conversation component definition
const Conversation = ({ conversation }: { conversation: ConversationType }) => {
  const { setSelectedConversation, selectedConversation } = useConversation(); // Functions to manage the selected conversation
  const { onlineUsers } = useSocketContext(); // List of online users from the socket context

  // Check if the current conversation is selected
  const isSelected = selectedConversation?.id === conversation.id;

  // Check if the user in the conversation is online
  const isOnline = onlineUsers.includes(conversation.id);

  return (
    <>
      {/* Conversation item */}
      <div
        className={`flex items-center gap-2 p-2 py-1 cursor-pointer hover:bg-sky-500 rounded-lg ${
          isSelected ? "bg-blue-500" : "" // Highlight if the conversation is selected
        }`}
        onClick={() => setSelectedConversation(conversation)} // Set the selected conversation on click
      >
        {/* User avatar with online status */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 rounded-full md:w-12">
            <img src={conversation.profilePic} alt="user avatar" />{" "}
            {/* User profile picture */}
          </div>
        </div>
        {/* Conversation details */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-3">
            <p className="text-sm font-bold text-gray-200 md:text-md">
              {conversation.fullName} {/* User's full name */}
            </p>
          </div>
        </div>
      </div>
      {/* Divider between conversations */}
      <div className="h-1 py-0 my-0 divider" />
    </>
  );
};

export default Conversation;
