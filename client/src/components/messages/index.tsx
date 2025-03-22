import useListenMessages from "../../hooks/useListen";
import useMessages from "../../hooks/useMessages";
import useChatScroll from "../../hooks/useScroll";
import MessageSkeleton from "../skeletons";
import Message from "./Message";

const Messages = () => {
  const { loading, messages } = useMessages(); // Fetch loading state and messages
  useListenMessages(); // Listen for real-time message updates
  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>; // Auto-scroll to the latest message

  return (
    <div className="flex-1 px-4 overflow-auto" ref={ref}>
      {/* Show skeleton loaders while messages are loading */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* Render messages when loading is complete */}
      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {/* Show a placeholder message if no messages exist */}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation.
        </p>
      )}
    </div>
  );
};

export default Messages;
