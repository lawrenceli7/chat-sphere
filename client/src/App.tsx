import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import AppRoutes from "./routes";

export default function App() {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen p-4 bg-gray-950">
      <AppRoutes />
      <Toaster />
    </div>
  );
}
