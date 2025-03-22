import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false); // State to track the loading status
  const { setAuthUser } = useAuthContext(); // Function to update the authenticated user in the context

  // Function to handle user logout
  const logout = async () => {
    setLoading(true); // Set loading to true while the logout request is in progress

    try {
      // Send a POST request to the logout API
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json(); // Parse the response JSON

      if (!res.ok) {
        throw new Error(data.error); // Throw an error if the response is not OK
      }

      setAuthUser(null); // Clear the authenticated user in the context
    } catch (error: any) {
      console.error(error.message); // Log the error to the console
      toast.error(error.message); // Show an error toast notification
    }
    setLoading(false); // Set loading to false after the request is complete
  };

  return { loading, logout }; // Return the loading state and logout function
};

export default useLogout;
