import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

// Type definition for the authenticated user
type AuthUserType = {
  id: string; // User ID
  fullName: string; // User's full name
  email: string; // User's email address
  profilePic: string; // URL of the user's profile picture
  gender: string; // User's gender
};

// Creating the AuthContext with default values
const AuthContext = createContext<{
  authUser: AuthUserType | null; // Authenticated user data
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>; // Function to update the authenticated user
  isLoading: boolean; // Loading state for authentication
}>({
  authUser: null,
  setAuthUser: () => {}, // Default no-op function
  isLoading: true,
});

// Custom hook to access the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext); // Returns the context value
};

// AuthContextProvider component to wrap the application and provide authentication context
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null); // State to store the authenticated user
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Effect to fetch the authenticated user on component mount
  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("/api/auth/me"); // API call to fetch the authenticated user
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error); // Handle API errors
        }

        setAuthUser(data); // Set the authenticated user data
      } catch (error: any) {
        console.error(error.message); // Log the error to the console
        toast.error(error.message); // Show an error toast notification
      }
      setIsLoading(false); // Set loading to false after fetching
    };

    fetchAuthUser(); // Call the function to fetch the user
  }, []);

  return (
    // Provide the authentication context to children components
    <AuthContext.Provider value={{ authUser, isLoading, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
