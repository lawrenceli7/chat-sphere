import { useRef } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

interface ChatFormProps {
  chatHistory: { role: string; text: string }[];
  setChatHistory: React.Dispatch<
    React.SetStateAction<{ role: string; text: string }[]>
  >;
  generateBotResponse: (history: { role: string; text: string }[]) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = inputRef.current ? inputRef.current.value.trim() : "";
    if (!userMessage) return;
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setChatHistory((history: { role: string; text: string }[]) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history: { role: string; text: string }[]) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 600);
  };

  return (
    <form
      action="#"
      className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm focus-within:border-[#3b7bdc]"
      onSubmit={handleFormSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="w-full h-2 px-4 text-sm bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
        required
      />
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
