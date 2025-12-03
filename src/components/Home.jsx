import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/OMDBApi";
import MovieCard from "./Moviecard";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [currentHero, setCurrentHero] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q") || "batman"; // default search
  const type = new URLSearchParams(location.search).get("type") || "";
  const page = Number(new URLSearchParams(location.search).get("page")) || 1;

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await searchMovies(query, type, page);
        if (!data.Search) {
          setMovies([]);
          setError("No movies found!");
          setTotal(0);
          return;
        }
        setMovies(data.Search);
        setTotal(Number(data.totalResults));
        setError("");
      } catch {
        setError("Error loading movies");
      }
    };
    fetchMovies();
  }, [query, type, page]);

  // Hero slider auto-change
  useEffect(() => {
    if (movies.length < 2) return;
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % Math.min(5, movies.length));
    }, 2000);
    return () => clearInterval(interval);
  }, [movies]);

  const totalPages = Math.ceil(total / 10);
  const goToPage = (p) => navigate(`/?q=${query}&type=${type}&page=${p}`);

  return (
    <div className="pt-28 text-white min-h-screen bg-black">

      {/* Hero Banner */}
      {movies.length > 0 && (
        <div className="relative w-full h-[500px] mb-12 overflow-hidden rounded-xl shadow-2xl">
          <AnimatePresence>
            <motion.img
              key={movies[currentHero].imdbID}
              src={movies[currentHero].Poster !== "N/A" ? movies[currentHero].Poster : "https://via.placeholder.com/800x600"}
              alt={movies[currentHero].Title}
              className="w-full h-full object-cover brightness-75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
          <div className="absolute bottom-6 left-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold"
            >
              {movies[currentHero].Title}
            </motion.h1>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 mt-2"
            >
              {movies[currentHero].Year}
            </motion.p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-center text-red-500 text-xl mt-10">{error}</p>}

      {/* Movie Grid */}
      {movies.length > 1 && (
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-6 text-red-500"
          >
            More results for: <span className="text-white">{query}</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {movies.slice(1).map((movie) => (
              <motion.div
                key={movie.imdbID}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                whileHover={{ scale: 1.05 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 transition rounded-xl font-semibold disabled:opacity-40"
              >
                Prev
              </button>

              <p className="text-lg font-medium text-gray-200">
                Page {page} / {totalPages}
              </p>

              <button
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 transition rounded-xl font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
