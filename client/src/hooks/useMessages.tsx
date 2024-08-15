import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API_URL from "../config";
import useConversation from "../zustand/useConversation";

const useMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return;

      setLoading(true);
      setMessages([]);

      try {
        const res = await fetch(
          `${API_URL}/api/messages/${selectedConversation.id}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "An error occurred");

        setMessages(data);
      } catch (error: any) {
        console.error(error.message);
        toast.error(error.message);
      }
      setLoading(false);
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading };
};
export default useMessages;
