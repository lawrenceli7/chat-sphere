import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false); // State to track the loading status
  const { setAuthUser } = useAuthContext(); // Function to update the authenticated user in the context

  // Function to handle user login
  const login = async (username: string, password: string) => {
    try {
      setLoading(true); // Set loading to true while the login request is in progress

      // Send a POST request to the login API
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set the request headers
        body: JSON.stringify({ username, password }), // Send the username and password in the request body
      });

      const data = await res.json(); // Parse the response JSON

      if (!res.ok) {
        throw new Error(data.error); // Throw an error if the response is not OK
      }

      setAuthUser(data); // Update the authenticated user in the context
    } catch (error: any) {
      console.error(error.message); // Log the error to the console
      toast.error(error.message); // Show an error toast notification
    }
    setLoading(false); // Set loading to false after the request is complete
  };

  return { loading, login }; // Return the loading state and login function
};

export default useLogin;
