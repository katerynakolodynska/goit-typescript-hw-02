import { useState } from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={s.input}
          placeholder="Search images..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
