import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjUyMzVlZGU1Y2YxNDIzMmM1YjMyZmNhZDQ3MjFmNiIsIm5iZiI6MTcyMDg1OTc0MC44NzU4MTUsInN1YiI6IjY2OTIzYTY5MjI2M2RhN2NjY2FkMTZiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KvmnCpoJDOy_GnVXEOPbdPRjok6yxpT6sdUhA5OGCbY",
  },
};

export const getMovie = async () => {
  const response = await axios.get(
    "/trending/movie/day?language=en-US",
    options
  );

  return response.data.results;
};

export const getMovieById = async (id) => {
  const response = await axios.get(`/movie/${id}?language=en-US`, options);

  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axios.get(
    `/movie/${id}/credits?language=en-US'`,
    options
  );

  return response.data;
};

export const getMovieReviews = async (id) => {
  const response = await axios.get(
    `/movie/${id}/reviews?language=en-US'`,
    options
  );

  return response.data.results;
};

export const getSearchMovie = async (value) => {
  const response = await axios.get(
    `/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};
