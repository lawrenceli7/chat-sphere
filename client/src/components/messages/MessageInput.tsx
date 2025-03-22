import { useState } from "react";
import { MdSend } from "react-icons/md";
import useSendMessage from "../../hooks/useSend";

const MessageInput = () => {
  const [message, setMessage] = useState(""); // State to manage the input message
  const { loading, sendMessage } = useSendMessage(); // Hook to send messages and track loading state

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!message.trim()) return; // Exit if the message is empty or only whitespace

    await sendMessage(message); // Send the message using the custom hook
    setMessage(""); // Clear the input field after sending
  };

  return (
    <form className="px-4 mb-3" onSubmit={handleSubmit}>
      <div className="relative w-full">
        {/* Input field for typing a message */}
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message..."
          value={message} // Bind the input value to the state
          onChange={(event) => setMessage(event.target.value)} // Update state on input change
        />
        {/* Submit button */}
        <button
          type="submit"
          className="absolute inset-y-0 flex items-center end-0 pe-3" // Position the button inside the input
        >
          {loading ? (
            <span className="loading loading-spinner" /> // Show a loading spinner while sending
          ) : (
            <MdSend className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
