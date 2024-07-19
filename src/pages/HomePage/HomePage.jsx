import { useEffect, useState } from "react";
import { getMovie } from "../../movie-api";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const [movies, setMovie] = useState();

  const location = useLocation();
  console.log("locationH: ", location);

  useEffect(() => {
    async function fetshMovies() {
      try {
        const data = await getMovie();
        setMovie(data);
      } catch (error) {}
    }
    fetshMovies();
  }, []);

  return (
    <div>
      <h2>Tranding today</h2>
      {movies && <MovieList movies={movies} state={location} />}
    </div>
  );
}
