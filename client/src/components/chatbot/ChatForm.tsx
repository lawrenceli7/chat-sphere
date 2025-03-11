import { useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const ChatForm = () => {
  const [message, setMessage] = useState("");

  return (
    <form
      action="#"
      className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm focus-within:border-purple-700"
    >
      <input
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-12 px-4 text-sm bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
        required
      />
      {message.length > 0 && (
        <button
          type="submit"
          className="p-2 mr-2 text-white bg-purple-700 rounded-full hover:bg-purple-600"
        >
          <IoIosArrowRoundUp size={25} />
        </button>
      )}
    </form>
  );
};

export default ChatForm;
