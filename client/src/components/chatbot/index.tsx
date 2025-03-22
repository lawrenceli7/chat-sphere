import { useEffect, useRef, useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { chatInfo } from "../../utils/chatInfo";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

// Chatbot component definition
const Chatbot = () => {
  // State to manage the chat history
  const [chatHistory, setChatHistory] = useState<
    { role: string; text: string; hideInChat?: boolean }[]
  >([
    {
      hideInChat: true, // Initial message is hidden from the chat
      role: "model", // Message is from the chatbot
      text: chatInfo, // Initial information message
    },
  ]);

  // State to manage the visibility of the chatbot
  const [showChatbot, setShowChatbot] = useState(false);

  // Reference to the chat body for scrolling
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  // Function to generate a bot response
  const generateBotResponse = async (history: any[]) => {
    // Helper function to update the chat history
    const updateHistory = (text: string, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."), // Remove "Thinking..." placeholder
        { role: "model", text, isError }, // Add the bot's response
      ]);
    };

    // Format the chat history for the API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    // API request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history, // Send the chat history to the API
      }),
    };

    try {
      // Make the API request
      const response = await fetch(
        import.meta.env.VITE_API_URL, // API URL from environment variables
        requestOptions
      );
      const data = await response.json();

      // Handle errors in the response
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong");

      // Extract and clean the bot's response text
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold formatting
        .trim();

      // Update the chat history with the bot's response
      updateHistory(apiResponseText);
    } catch (error: any) {
      // Update the chat history with an error message
      updateHistory(error.message, true);
    }
  };

  // Scroll to the bottom of the chat body whenever the chat history changes
  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  // Render the chatbot UI
  return (
    <div className="flex items-center justify-center w-full bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Button to toggle the chatbot visibility */}
      <button
        className="fixed z-50 flex items-center justify-center w-12 h-12 p-2 text-white transition duration-200 bg-[#3b7bdc] rounded-full bottom-4 right-4 hover:bg-[#2051c3]"
        onClick={() => setShowChatbot((prev) => !prev)} // Toggle visibility
      >
        <span className="absolute w-6 h-6 rounded-full top-4 right-2">
          <FaMessage />
        </span>
      </button>

      {/* Chatbot container */}
      <div
        className={`fixed overflow-hidden bg-white rounded-lg shadow-2xl opacity-0 pointer-events-none w-96 bottom-20 right-6 transition ease-in-out duration-100 origin-bottom-right ${
          showChatbot
            ? "opacity-100 pointer-events-auto bottom-20 right-6 fixed" // Show chatbot
            : "" // Hide chatbot
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
            onClick={() => setShowChatbot((prev) => !prev)} // Close chatbot
          >
            <IoIosArrowDown size={25} />
          </button>
        </div>

        {/* Chatbot body */}
        <div
          ref={chatBodyRef} // Attach the chat body reference
          className="flex flex-col gap-5 px-6 py-6 overflow-y-auto h-96"
        >
          {/* Initial chatbot message */}
          <div className="flex items-center gap-2">
            <ChatbotIcon />
            <p className="max-w-xs p-3 text-sm bg-purple-100 rounded-lg">
              Hi! I'm a chatbot. How can I help you today?
            </p>
          </div>
          {/* Render chat messages */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot footer */}
        <div className="bottom-0 w-full p-4 bg-white">
          <ChatForm
            chatHistory={chatHistory} // Pass chat history
            setChatHistory={setChatHistory} // Pass function to update chat history
            generateBotResponse={generateBotResponse} // Pass function to generate bot response
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
