import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSend = () => {
  const [loading, setLoading] = useState(false); // State to track the loading status
  const { messages, setMessages, selectedConversation } = useConversation(); // Access messages, setter function, and the selected conversation

  // Function to send a message
  const sendMessage = async (message: string) => {
    if (!selectedConversation) return; // Exit if no conversation is selected
    setLoading(true); // Set loading to true while the message is being sent

    try {
      // Send a POST request to the API to send the message
      const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request headers
        },
        body: JSON.stringify({ message }), // Send the message in the request body
      });

      const data = await res.json(); // Parse the response JSON
      if (data.error) throw new Error(data.error); // Throw an error if the response contains an error

      setMessages([...messages, data]); // Add the new message to the existing messages
    } catch (error: any) {
      console.log(error.message); // Log the error to the console
      toast.error(error.message); // Show an error toast notification
    }
    setLoading(false); // Set loading to false after the request is complete
  };

  return { sendMessage, loading }; // Return the sendMessage function and loading state
};

export default useSend;
