import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          onSearch(ref.current.value);
        }
      }}
      className="w-full"
    >
      <div className="relative w-full">
        <BsSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          ref={ref}
          type="text"
          placeholder="Search games ..."
          className="w-full rounded-full border border-slate-200 bg-slate-100 py-2 pl-9 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-white/[0.04] dark:text-slate-100"
        />
      </div>
    </form>
  );
};

export default SearchInput;
