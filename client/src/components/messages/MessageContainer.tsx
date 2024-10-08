import { FaUser } from "react-icons/fa";
import { PiHandWavingBold } from "react-icons/pi";
import { SiImessage } from "react-icons/si";
import Messages from ".";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex flex-col w-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="px-4 py-2 mb-2 bg-slate-500">
            <div className="flex items-center gap-2">
              <span className="label-text">To:</span>{" "}
              <FaUser className="w-4 h-4 text-gray-900" />
              <span className="font-bold text-gray-900">
                {selectedConversation.fullName}
              </span>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-2 px-4 font-semibold text-center text-gray-200 sm:text-lg md:text-xl">
        <p className="flex items-center gap-2">
          Welcome <PiHandWavingBold /> {authUser?.fullName}
        </p>
        <p>Select a chat to start messaging.</p>
        <SiImessage className="text-3xl text-center md:text-4xl" />
      </div>
    </div>
  );
};
