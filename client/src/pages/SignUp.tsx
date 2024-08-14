import { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
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
    <div className="flex flex-col items-center justify-center mx-auto min-w-96">
      <div className="w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatSphere</span>
        </h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className="p-2 label">
              <span className="text-base text-white label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full h-10 input input-bordered"
              value={inputs.fullName}
              onChange={(event) =>
                setInputs({ ...inputs, fullName: event.target.value })
              }
            />
          </div>

          <div>
            <label className="p-2 label ">
              <span className="text-base text-white label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full h-10 input input-bordered"
              value={inputs.username}
              onChange={(event) =>
                setInputs({ ...inputs, username: event.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base text-white label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full h-10 input input-bordered"
              value={inputs.password}
              onChange={(event) =>
                setInputs({ ...inputs, password: event.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base text-white label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full h-10 input input-bordered"
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
            className="inline-block mt-2 text-sm text-white hover:underline hover:text-blue-600"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="mt-2 border btn btn-block btn-sm border-slate-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
