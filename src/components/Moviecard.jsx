import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.imdbID}`} 
      className="relative block w-48 sm:w-56 md:w-60 rounded-xl overflow-hidden 
                 transform transition-all duration-300 hover:scale-105 
                 hover:shadow-xl hover:shadow-red-800/40 bg-black"
    >
      {/* Movie Poster */}
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />

      {/* Fade Bottom Overlay */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/90 to-transparent p-3 flex flex-col justify-end">
        <h2 className="text-white font-bold text-sm truncate">{movie.Title}</h2>
        <p className="text-gray-300 text-xs">{movie.Year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
