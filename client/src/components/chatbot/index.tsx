import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<
    { role: string; text: string }[]
  >([]);

  const generateBotResponse = (history: any[]) => {
    console.log(history);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <div className="relative overflow-hidden bg-white rounded-lg shadow-2xl w-96">
        {/* Chatbot header */}
        <div className="flex items-center justify-between px-6 py-4 bg-purple-700">
          <div className="flex items-center gap-2">
            <ChatbotIcon />
            <h2 className="text-lg font-semibold text-white">Chatbot</h2>
          </div>
          <button className="p-2 text-2xl text-white transition duration-200 rounded-full hover:bg-purple-800">
            <IoIosArrowDown size={25} />
          </button>
        </div>

        {/* Chatbot body */}
        <div className="flex flex-col gap-5 px-6 py-6 overflow-y-auto h-96">
          <div className="flex items-center gap-2">
            <ChatbotIcon />
            <p className="max-w-xs p-3 text-sm bg-purple-100 rounded-lg">
              Hi! I'm a chatbot. How can I help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot footer */}
        <div className="absolute bottom-0 w-full p-4 bg-white">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
