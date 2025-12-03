const API_KEY = "b3679057";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, type = "", page = 1) => {
  if (!query) return { Search: [], totalResults: 0 };

  let url = `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`;

  if (type !== "") {
    url += `&type=${type}`;
  }

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
