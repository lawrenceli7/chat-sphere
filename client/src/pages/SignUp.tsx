import { Button, FloatingLabel, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiUser, HiUserCircle } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import GenderCheckbox from "../components/checkbox";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender: "male" | "female") => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto rounded-lg shadow-sm min-w-1/3 shadow-white">
      <div className="w-full p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-semibold text-center text-white">
          Sign Up <span className="text-blue-500"> ChatSphere</span>
        </h1>
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <HiUser className="w-6 h-6 text-white" />
            <span>:</span>
            <FloatingLabel
              label="Full Name"
              className="text-gray-400 min-w-96"
              helperText="Enter your full name"
              variant="standard"
              sizing="md"
              value={inputs.fullName}
              onChange={(event) =>
                setInputs({ ...inputs, fullName: event.target.value })
              }
              type="text"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <HiUserCircle className="w-6 h-6 text-white" />
            <span>:</span>
            <FloatingLabel
              label="Username"
              className="text-gray-400 min-w-96"
              helperText="Enter your username"
              variant="standard"
              sizing="md"
              type="text"
              value={inputs.username}
              onChange={(event) =>
                setInputs({ ...inputs, username: event.target.value })
              }
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
              type="password"
              value={inputs.password}
              onChange={(event) =>
                setInputs({ ...inputs, password: event.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <RiLockPasswordFill className="w-6 h-6 text-white" />
            <span>:</span>
            <FloatingLabel
              label="Confirm Password"
              className="text-gray-400 min-w-96"
              helperText="Re-enter your password"
              variant="standard"
              sizing="md"
              type="password"
              value={inputs.confirmPassword}
              onChange={(event) =>
                setInputs({ ...inputs, confirmPassword: event.target.value })
              }
            />
          </div>
          <GenderCheckbox
            selectedGender={inputs.gender}
            onCheckboxChange={handleCheckboxChange}
          />
          <Link
            to={"/login"}
            className="block mt-2 text-sm text-center text-blue-400 hover:underline"
          >
            Already have an account?
          </Link>
          <div>
            <Button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white rounded-md focus:outline-none"
              color="blue"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Spinner
                    className="mr-2"
                    size="sm"
                    aria-label="Signup loading spinner"
                  />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MdOutlineLogout className="w-6 h-6" />
                  <span>Sign Up</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
