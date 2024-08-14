import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="w-full rounded-full input-sm md:input input-bordered sm:rounded-full"
      />
      <button
        type="submit"
        className="text-white btn md:btn-md btn-sm btn-circle bg-sky-500 "
      >
        <FiSearch className="w-4 h-4 outline-none md:w-6 md:h-6" />
      </button>
    </form>
  );
};
export default SearchInput;
