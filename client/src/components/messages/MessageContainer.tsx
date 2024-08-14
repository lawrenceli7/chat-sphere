import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
    <div className="flex flex-col w-full">
      <>
        <div className="px-4 py-2 mb-2 bg-slate-500">
          <span className="label-text">To:</span>{" "}
          <span className="font-bold text-gray-900">John Doe</span>
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
};
export default MessageContainer;
