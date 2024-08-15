import { IoMdLogOut } from "react-icons/io";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <div
      className="flex gap-2 p-2 mt-auto bg-blue-500 rounded-lg hover:bg-sky-500"
      onClick={logout}
    >
      <IoMdLogOut className="w-6 h-6 text-white cursor-pointer" />
      <h1 className="text-white">Logout</h1>
    </div>
  );
};
export default LogoutButton;
