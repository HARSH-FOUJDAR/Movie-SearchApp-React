import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/?q=${query}&page=1`);
      setShowSearch(false);
    }
  };

  // Category links
  const goCategory = (category) => {
    navigate(`/?q=${category}&page=1`);
    setShowSearch(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-md px-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <div
          className="text-red-600 text-2xl font-bold cursor-pointer "
          onClick={() => goCategory("all")}
        >
          MovieSearchingApp
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <button onClick={() => goCategory("all")} className="text-white hover:text-red-500 font-semibold">
            Home
          </button>
          <button onClick={() => goCategory("movie")} className="text-white hover:text-red-500 font-semibold">
            Movies
          </button>
          <button onClick={() => goCategory("series")} className="text-white hover:text-red-500 font-semibold">
            Series
          </button>

          {/* Search Icon */}
          <button onClick={() => setShowSearch(!showSearch)} className="text-white text-xl hover:text-red-500">
            <FiSearch />
          </button>
        </div>
      </div>

      {/* Animated Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-neutral-900 px-6 py-4"
          >
            <form onSubmit={handleSearch} className="flex justify-center">
              <motion.input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                className="p-3 px-5 w-72 sm:w-96 text-white bg-neutral-800 border border-neutral-700 rounded-xl outline-none"
                autoFocus
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold ml-2"
              >
                Search
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default SearchBar;
