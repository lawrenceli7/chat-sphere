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
import API_URL from "../config";

type AuthUserType = {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  gender: string;
};

const AuthContext = createContext<{
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        setAuthUser(data);
      } catch (error: any) {
        console.error(error.message);
        toast.error(error.message);
      }
      setIsLoading(false);
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, isLoading, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
