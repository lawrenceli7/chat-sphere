import { useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import useGetConversations from "../../hooks/useConversations";
import useConversation, {
  ConversationType,
} from "../../zustand/useConversation";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!search) return;

    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="w-full rounded-full input-sm md:input input-bordered sm:rounded-full bg-slate-800"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-blue-500 btn md:btn-md btn-sm btn-circle hover:bg-sky-500"
      >
        <FiSearch className="w-4 h-4 outline-none md:w-6 md:h-6" />
      </button>
    </form>
  );
};
export default SearchInput;
