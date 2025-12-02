import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api/OMDBApi";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
//aplijs
  useEffect(() => {
    getMovieDetails(id).then((data) => setMovie(data));
  }, [id]);

  if (!movie)
    return <p className="text-center mt-10 text-white text-xl">Loading...</p>;
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
      <div className="relative flex flex-col md:flex-row gap-10 z-10 max-w-5xl mx-auto">
        {/* Left Poster */}
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="rounded-lg shadow-xl w-64 md:w-80"
        />

        {/* Right Details */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{movie.Title}</h1>

          {/* Rating Badge */}
          <p className="bg-yellow-500 text-black font-bold px-3 py-1 inline-block rounded">
            ⭐ IMDB: {movie.imdbRating}
          </p>

          <p className="text-gray-300 text-lg">{movie.Genre}</p>

          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Plot: </strong> {movie.Pplot}
          </p>

          <p className="text-gray-300">
            <strong className="text-white">Actors: </strong> {movie.Actors}
          </p>

          <p className="text-gray-300">
            <strong className="text-white">Released:</strong> {movie.Released}
          </p>

          {/* Netflix-style Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleWatchTrailer}
              className="bg-red-600 cursor-pointer hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
            >
              ▶ Play Trailer
            </button>

            <button className="bg-gray-700 cursor-pointer hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold">
              + Add to Watchlist
            </button>
          </div>

          {/* Back Button */}
          <Link
            to="/"
            className="mt-6 inline-block text-red-400 hover:text-red-300 font-semibold"
          >
            ← Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
