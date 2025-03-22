import { useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import useGetConversations from "../../hooks/useConversations";
import useConversation, {
  ConversationType,
} from "../../zustand/useConversation";

const SearchInput = () => {
  const [search, setSearch] = useState(""); // State to manage the search input
  const { setSelectedConversation } = useConversation(); // Function to set the selected conversation
  const { conversations } = useGetConversations(); // Fetch the list of conversations

  // Handle form submission for searching conversations
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!search) return; // Exit if the search input is empty

    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long"); // Show error if search term is too short
    }

    // Find a conversation that matches the search term
    const conversation = conversations.find((c: ConversationType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation); // Set the found conversation as selected
      setSearch(""); // Clear the search input
    } else {
      toast.error("No such user found!"); // Show error if no match is found
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      {/* Input field for entering the search term */}
      <input
        type="text"
        placeholder="Search…"
        className="w-full rounded-full input-sm md:input input-bordered sm:rounded-full bg-slate-800"
        value={search} // Bind the input value to the state
        onChange={(event) => setSearch(event.target.value)} // Update state on input change
      />

      <button
        type="submit"
        className="text-white bg-blue-500 btn md:btn-md btn-sm btn-circle hover:bg-sky-500"
      >
        <FiSearch className="w-4 h-4 outline-none md:w-6 md:h-6" />{" "}
      </button>
    </form>
  );
};

export default SearchInput;
