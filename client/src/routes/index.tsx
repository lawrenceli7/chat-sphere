import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export default function AppRoutes() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/signup"
        element={!authUser ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={!authUser ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
