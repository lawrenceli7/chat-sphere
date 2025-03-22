import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListen = () => {
  const { socket } = useSocketContext(); // Access the socket instance from the context
  const { messages, setMessages } = useConversation(); // Access messages and the function to update them

  useEffect(() => {
    // Listen for the "newMessage" event from the socket
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true; // Add a flag to indicate the message should shake
      const sound = new Audio(notificationSound); // Create a new audio instance for the notification sound
      sound.play(); // Play the notification sound
      setMessages([...messages, newMessage]); // Add the new message to the existing messages
    });

    // Cleanup the event listener when the component unmounts or dependencies change
    return () => {
      socket?.off("newMessage"); // Remove the "newMessage" event listener
    };
  }, [socket, messages, setMessages]); // Dependencies for the effect
};

export default useListen;
