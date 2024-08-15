import { useState } from "react";
import toast from "react-hot-toast";
import API_URL from "../config";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setAuthUser(data);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return { loading, login };
};
export default useLogin;
