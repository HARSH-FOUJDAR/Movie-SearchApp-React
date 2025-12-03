import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api/OMDBApi";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then((data) => setMovie(data));
  }, [id]);

  if (!movie)
    return (
      <p className="text-center mt-10 text-white text-xl">Loading...</p>
    );

  const handleWatchTrailer = () => {
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      movie.Title + " trailer"
    )}`;
    window.open(youtubeUrl, "_blank");
  };

  return (
    <div className="relative min-h-screen text-white bg-black overflow-hidden pt-24 px-6">
      {/* Background Blur Poster */}
      <div
        className="absolute inset-0 opacity-30 blur-2xl"
        style={{
          backgroundImage: `url(${movie.Poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content Section */}
      <motion.div
        className="relative flex flex-col md:flex-row gap-10 z-10 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Poster */}
        <motion.img
          src={movie.Poster}
          alt={movie.Title}
          className="rounded-lg shadow-xl w-64 md:w-80"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Right Details */}
        <div className="space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {movie.Title}
          </motion.h1>

          <motion.p
            className="bg-yellow-500 text-black font-bold px-3 py-1 inline-block rounded"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            ⭐ IMDB: {movie.imdbRating}
          </motion.p>

          <motion.p
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {movie.Genre}
          </motion.p>

          <motion.p
            className="text-gray-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <strong className="text-white">Plot: </strong> {movie.Plot}
          </motion.p>

          <motion.p
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <strong className="text-white">Actors: </strong> {movie.Actors}
          </motion.p>

          <motion.p
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <strong className="text-white">Released: </strong> {movie.Released}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.button
              onClick={handleWatchTrailer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 cursor-pointer hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
            >
              ▶ Play Trailer
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-700 cursor-pointer hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
            >
              + Add to Watchlist
            </motion.button>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link
              to="/"
              className="mt-6 inline-block text-red-400 hover:text-red-300 font-semibold"
            >
              ← Back to Search
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieDetails;
