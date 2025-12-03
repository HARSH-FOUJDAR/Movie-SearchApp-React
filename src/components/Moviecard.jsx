import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-48 sm:w-56 md:w-60 rounded-xl overflow-hidden bg-black shadow-md"
    >
      <Link to={`/movie/${movie.imdbID}`}>
        {/* Movie Poster */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          className="w-full h-72 object-cover rounded-xl"
        />

        {/* Fade Bottom Overlay */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/90 to-transparent p-3 flex flex-col justify-end">
          <h2 className="text-white font-bold text-sm truncate">{movie.Title}</h2>
          <p className="text-gray-300 text-xs">{movie.Year}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
