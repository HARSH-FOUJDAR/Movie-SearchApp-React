const API_KEY = "b3679057";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page = 1) => {
  if (!query) return { Search: [], totalResults: 0 }; // ⭐ Empty query safe return

  const url = `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getMovieDetails = async (imdbID) => {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
