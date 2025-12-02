import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../api/OMDBApi";
import MovieCard from "./Moviecard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    if (!query) return; 

    const fetchMovies = async () => {
      try {
        const data = await searchMovies(query);

        if (!data.Search) {
          setMovies([]);
          setError("No movies found!");
          return;
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        setError("Failed to load movies!");
        setMovies([]);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="pt-24 px-6 text-white min-h-screen bg-black">

      {/* When no search */}
      {!query && (
        <h2 className="text-3xl font-bold text-center text-gray-300 mt-20">
          🔍 Search for movies to begin...
        </h2>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 text-xl mt-10">{error}</p>
      )}

      {/* Movie Grid */}
      {movies.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Search Results for: <span className="text-red-500">{query}</span>
          </h2>

          <div className="
            grid 
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
            gap-5
          ">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
