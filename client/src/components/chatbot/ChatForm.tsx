import { useRef } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

// Defining the props interface for the ChatForm component
interface ChatFormProps {
  chatHistory: { role: string; text: string }[]; // Array of chat messages with role and text
  setChatHistory: React.Dispatch<
    React.SetStateAction<{ role: string; text: string }[]>
  >; // Function to update the chat history
  generateBotResponse: (history: { role: string; text: string }[]) => void; // Function to generate a bot response
}

// ChatForm component definition
const ChatForm: React.FC<ChatFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}) => {
  // Reference to the input field
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get the user's message from the input field
    const userMessage = inputRef.current ? inputRef.current.value.trim() : "";
    if (!userMessage) return; // Exit if the message is empty

    // Clear the input field
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Add the user's message to the chat history
    setChatHistory((history: { role: string; text: string }[]) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Simulate a delay before generating the bot's response
    setTimeout(() => {
      // Add a placeholder "Thinking..." message from the bot
      setChatHistory((history: { role: string; text: string }[]) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      // Call the generateBotResponse function with the updated chat history
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address this query: ${userMessage}`,
        },
      ]);
    }, 600); // 600ms delay
  };

  // Render the chat input form
  return (
    <form
      action="#"
      className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm focus-within:border-[#3b7bdc]"
      onSubmit={handleFormSubmit} // Attach the form submit handler
    >
      {/* Input field for the user's message */}
      <input
        ref={inputRef} // Attach the input reference
        type="text"
        placeholder="Message..."
        className="w-full h-2 px-4 text-sm bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
        required
      />
      {/* Submit button with an icon */}
      <button
        type="submit"
        className="p-2 mr-2 text-white bg-[#3b7bdc] rounded-full hover:bg-[#2051c3]"
      >
        <IoIosArrowRoundUp size={25} />
      </button>
    </form>
  );
};

export default ChatForm;
