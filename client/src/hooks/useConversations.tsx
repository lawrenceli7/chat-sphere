import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ConversationType } from "../zustand/useConversation";

const useConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error: any) {
        console.error(error.message);
        toast.error(error.message);
      }
      setLoading(false);
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useConversations;
