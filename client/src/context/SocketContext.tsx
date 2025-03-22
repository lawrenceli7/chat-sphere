import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

// Interface for the SocketContext
interface ISocketContext {
  socket: Socket | null; // Socket instance
  onlineUsers: string[]; // List of online users
}

// Creating the SocketContext with an undefined default value
const SocketContext = createContext<ISocketContext | undefined>(undefined);

// Custom hook to access the SocketContext
// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = (): ISocketContext => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider."
    ); // Throw an error if the hook is used outside the provider
  }
  return context;
};

// Define the socket URL based on the environment
const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

// SocketContextProvider component to manage the socket connection
const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null); // Ref to store the socket instance
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // State to store the list of online users
  const { authUser, isLoading } = useAuthContext(); // Access authenticated user and loading state

  useEffect(() => {
    // Establish a socket connection when the user is authenticated
    if (authUser && !isLoading) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id, // Pass the user ID as a query parameter
        },
      });

      socketRef.current = socket; // Store the socket instance in the ref

      // Listen for the "getOnlineUsers" event to update the list of online users
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // Cleanup the socket connection when the component unmounts
      return () => {
        socket.close(); // Close the socket connection
        socketRef.current = null; // Reset the socket ref
      };
    } else if (!authUser && !isLoading) {
      // Close the socket connection if the user logs out
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [authUser, isLoading]); // Re-run the effect when authUser or isLoading changes

  return (
    // Provide the socket instance and online users to the context
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
