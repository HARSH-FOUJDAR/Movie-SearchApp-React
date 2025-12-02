import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/?q=${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
        w-full fixed top-0 left-0 z-50 
        flex justify-center items-center 
        bg-black/80 backdrop-blur-md 
        h-20 shadow-lg border-b border-red-600/40
      "
    >
      <div className="flex items-center">
        {/* INPUT */}
        <input
          type="text"
          placeholder="Search movies, shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            p-3 px-5 w-72 sm:w-96 
            text-white bg-neutral-800/80 
            border border-neutral-700 
            rounded-l-xl placeholder-gray-400 
            focus:ring-2 focus:ring-red-900 
            outline-none transition
          "
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="
          cursor-pointer
            bg-red-600 text-white px-6 py-3 
            rounded-r-xl font-semibold 
            hover:bg-red-700 active:scale-95 
            transition-all duration-200 shadow-md
          "
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
