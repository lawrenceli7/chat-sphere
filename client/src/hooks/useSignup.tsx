import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// Type definition for the signup input fields
type SignupInputs = {
  fullName: string; // User's full name
  username: string; // Username for the account
  password: string; // Password for the account
  confirmPassword: string; // Confirmation of the password
  gender: string; // User's gender
};

const useSignup = () => {
  const [loading, setLoading] = useState(false); // State to track the loading status
  const { setAuthUser } = useAuthContext(); // Function to update the authenticated user in the context

  // Function to handle user signup
  const signup = async (inputs: SignupInputs) => {
    try {
      setLoading(true); // Set loading to true while the signup request is in progress

      // Send a POST request to the signup API
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request headers
        },
        body: JSON.stringify(inputs), // Send the signup inputs in the request body
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

  return { loading, signup }; // Return the loading state and signup function
};

export default useSignup;
