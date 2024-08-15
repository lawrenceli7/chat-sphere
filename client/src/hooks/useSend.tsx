import { useState } from "react";
import toast from "react-hot-toast";
import API_URL from "../config";
import useConversation from "../zustand/useConversation";

const useSend = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/messages/send/${selectedConversation.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return { sendMessage, loading };
};
export default useSend;
