import { Button, FloatingLabel, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "", // State for the username input
    password: "", // State for the password input
  });
  const { loading, login } = useLogin(); // Access the login function and loading state from the custom hook

  // Handle form submission
  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    login(inputs.username, inputs.password); // Call the login function with the input values
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Login form container */}
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        {/* Title */}
        <h1 className="mb-6 text-3xl font-semibold text-center text-white">
          Login
          <span className="text-blue-500"> ChatSphere</span>
        </h1>
        {/* Login form */}
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {/* Username input */}
          <div className="flex items-center justify-center gap-2">
            <HiUserCircle className="w-6 h-6 text-white" /> {/* User icon */}
            <span>:</span>
            <FloatingLabel
              label="Username"
              className="text-gray-400 w-72"
              helperText="Enter your username"
              variant="standard"
              sizing="md"
              value={inputs.username} // Bind the input value to the state
              onChange={
                (event) =>
                  setInputs({ ...inputs, username: event.target.value }) // Update the username state on input change
              }
              type="text"
            />
          </div>
          {/* Password input */}
          <div className="flex items-center justify-center gap-2">
            <RiLockPasswordFill className="w-6 h-6 text-white" />{" "}
            {/* Password icon */}
            <span>:</span>
            <FloatingLabel
              label="Password"
              className="text-gray-400 w-72"
              helperText="Enter your password"
              variant="standard"
              sizing="md"
              value={inputs.password} // Bind the input value to the state
              onChange={
                (event) =>
                  setInputs({ ...inputs, password: event.target.value }) // Update the password state on input change
              }
              type="password"
            />
          </div>
          {/* Link to the signup page */}
          <Link
            to="/signup"
            className="block mt-2 text-sm text-center text-white hover:underline hover:text-blue-600"
          >
            {"Don't"} have an account?
          </Link>
          {/* Submit button */}
          <div>
            <Button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white rounded-md focus:outline-none"
              disabled={loading} // Disable the button while loading
              color="blue"
            >
              {loading ? (
                <>
                  {/* Spinner for loading state */}
                  <Spinner
                    className="mr-2"
                    size="sm"
                    aria-label="Logout loading spinner"
                  />
                  <span>Loading...</span>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <MdOutlineLogout className="w-6 h-6" /> {/* Login icon */}
                  <span>Login</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
