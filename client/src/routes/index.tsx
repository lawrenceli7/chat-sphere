import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export default function AppRoutes() {
  const { authUser } = useAuthContext(); // Access the authenticated user from the context

  return (
    <Routes>
      {/* Route for the home page */}
      <Route
        path="/"
        element={authUser ? <Home /> : <Navigate to="/login" />} // Redirect to login if the user is not authenticated
      />
      {/* Route for the sign-up page */}
      <Route
        path="/signup"
        element={!authUser ? <SignUp /> : <Navigate to="/" />} // Redirect to home if the user is already authenticated
      />
      {/* Route for the login page */}
      <Route
        path="/login"
        element={!authUser ? <Login /> : <Navigate to="/" />} // Redirect to home if the user is already authenticated
      />
    </Routes>
  );
}
