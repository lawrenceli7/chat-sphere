import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar";

const Home = () => {
  return (
    <div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-slate-600 shadow-md shadow-white">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
