import { FormEvent, useState } from "react";
import s from "./SearchBar.module.css";

import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
  takeQuery: (query: string) => void;
}

const SearchBar = ({ takeQuery }: SearchBarProps) => {
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim().length < 2) {
      toast.error("Please enter at least 2 characters to search!");
      return;
    }
    takeQuery(search);
    setSearch("");
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          placeholder="Search images..."
          name="query"
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
};

export default SearchBar;
