import { Button, FloatingLabel, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { loading, login } = useLogin();

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    login(inputs.username, inputs.password);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto rounded-lg shadow-sm min-w-1/3 shadow-white">
      <div className="w-full p-6 bg-gray-800 rounded-lg shadow-md ">
        <h1 className="mb-6 text-3xl font-semibold text-center text-white">
          Login
          <span className="text-blue-500"> ChatSphere</span>
        </h1>
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <HiUserCircle className="w-6 h-6 text-white" />
            <span>:</span>
            <FloatingLabel
              label="Username"
              className="text-gray-400 min-w-96"
              helperText="Enter your username"
              variant="standard"
              sizing="md"
              value={inputs.username}
              onChange={(event) =>
                setInputs({ ...inputs, username: event.target.value })
              }
              type="text"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <RiLockPasswordFill className="w-6 h-6 text-white" />
            <span>:</span>
            <FloatingLabel
              label="Password"
              className="text-gray-400 min-w-96"
              helperText="Enter your password"
              variant="standard"
              sizing="md"
              value={inputs.password}
              onChange={(event) =>
                setInputs({ ...inputs, password: event.target.value })
              }
              type="password"
            />
          </div>
          <Link
            to="/signup"
            className="block mt-2 text-sm text-center text-white hover:underline hover:text-blue-600"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <Button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white rounded-md focus:outline-none"
              disabled={loading}
              color="blue"
            >
              {loading ? (
                <>
                  <Spinner
                    className="mr-2"
                    size="sm"
                    aria-label="Logout loading spinner"
                  />
                  <span>"Loading..." </span>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <MdOutlineLogout className="w-6 h-6" />
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
