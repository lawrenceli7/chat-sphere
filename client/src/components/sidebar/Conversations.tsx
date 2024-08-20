import useConversations from "../../hooks/useConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations, loading } = useConversations();

  return (
    <div className="flex flex-col py-2 overflow-auto">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
      {loading ? <span className="mx-auto loading loading-spinner" /> : null}
    </div>
  );
};
export default Conversations;
