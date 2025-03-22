import ChatbotIcon from "./ChatbotIcon";

interface Chat {
  role: string;
  text: string;
  isError?: boolean;
  hideInChat?: boolean;
}

const ChatMessage = ({ chat }: { chat: Chat }) => {
  return (
    !chat.hideInChat && (
      <div
        className={`flex items-center ${
          chat.role === "model" ? "justify-start" : "justify-end"
        } ${chat.isError ? "error" : ""}`}
      >
        {chat.role === "model" && <ChatbotIcon />}
        <p
          className={`max-w-xs p-3 text-sm rounded-lg ${
            chat.role === "model" ? "bg-purple-100" : "bg-[#3b7bdc] text-white"
          }`}
        >
          {chat.text}
        </p>
      </div>
    )
  );
};

export default ChatMessage;
