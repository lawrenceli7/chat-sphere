import { useEffect, useRef, useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<
    { role: string; text: string }[]
  >([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const generateBotResponse = async (history: any[]) => {
    const updateHistory = (text: string) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history,
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="flex items-center justify-center w-full bg-gradient-to-b from-blue-100 to-blue-300">
      <button
        className="fixed z-50 flex items-center justify-center w-12 h-12 p-2 text-white transition duration-200 bg-[#3b7bdc] rounded-full bottom-4 right-4 hover:bg-[#2051c3]"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <span className="absolute w-6 h-6 rounded-full top-4 right-2">
          <FaMessage />
        </span>
      </button>
      <div
        className={`fixed overflow-hidden bg-white rounded-lg shadow-2xl opacity-0 pointer-events-none w-96 bottom-20 right-6 transition  ease-in-out duration-100 origin-bottom-right} ${
          showChatbot
            ? "opacity-100 pointer-events-auto bottom-20 right-6 fixed"
            : ""
        }`}
      >
        {/* Chatbot header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#3b7bdc]">
          <div className="flex items-center gap-2">
            <ChatbotIcon />
            <h2 className="text-lg font-semibold text-white">Chatbot</h2>
          </div>
          <button
            className="p-2 text-2xl text-white transition duration-200 rounded-full hover:bg-[#2051c3]"
            onClick={() => setShowChatbot((prev) => !prev)}
          >
            <IoIosArrowDown size={25} />
          </button>
        </div>

        {/* Chatbot body */}
        <div
          ref={chatBodyRef}
          className="flex flex-col gap-5 px-6 py-6 overflow-y-auto h-96"
        >
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
        <div className="bottom-0 w-full p-4 bg-white">
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
