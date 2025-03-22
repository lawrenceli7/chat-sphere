import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ConversationType } from "../zustand/useConversation";

const useConversations = () => {
  const [loading, setLoading] = useState(false); // State to track loading status
  const [conversations, setConversations] = useState<ConversationType[]>([]); // State to store the list of conversations

  useEffect(() => {
    // Function to fetch conversations from the API
    const getConversations = async () => {
      setLoading(true); // Set loading to true while fetching data

      try {
        const res = await fetch("/api/messages/conversations"); // API call to fetch conversations
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error); // Handle API errors
        }

        setConversations(data); // Update the state with the fetched conversations
      } catch (error: any) {
        console.error(error.message); // Log the error to the console
        toast.error(error.message); // Show an error toast notification
      }
      setLoading(false); // Set loading to false after fetching
    };

    getConversations(); // Call the function to fetch conversations
  }, []); // Run the effect only once when the component mounts

  return { loading, conversations }; // Return the loading state and conversations
};

export default useConversations;
