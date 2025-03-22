import useConversations from "../../hooks/useConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations, loading } = useConversations(); // Fetch conversations and loading state

  return (
    <div className="flex flex-col py-2 overflow-auto">
      {/* Render a list of conversations */}
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
      {/* Show a loading spinner while conversations are being fetched */}
      {loading ? <span className="mx-auto loading loading-spinner" /> : null}
    </div>
  );
};

export default Conversations;
