import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useMessages = () => {
  const [loading, setLoading] = useState(false); // State to track the loading status
  const { messages, setMessages, selectedConversation } = useConversation(); // Access messages, setter function, and the selected conversation

  useEffect(() => {
    // Function to fetch messages for the selected conversation
    const getMessages = async () => {
      if (!selectedConversation) return; // Exit if no conversation is selected

      setLoading(true); // Set loading to true while fetching messages
      setMessages([]); // Clear existing messages before fetching new ones

      try {
        // Fetch messages for the selected conversation
        const res = await fetch(`/api/messages/${selectedConversation.id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "An error occurred"); // Handle API errors

        setMessages(data); // Update the state with the fetched messages
      } catch (error: any) {
        console.error(error.message); // Log the error to the console
        toast.error(error.message); // Show an error toast notification
      }
      setLoading(false); // Set loading to false after fetching
    };

    getMessages(); // Call the function to fetch messages
  }, [selectedConversation, setMessages]); // Re-run the effect when the selected conversation changes

  return { messages, loading }; // Return the messages and loading state
};

export default useMessages;
