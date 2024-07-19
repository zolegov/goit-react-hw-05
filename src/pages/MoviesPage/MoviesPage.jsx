import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchMovie from "../../components/SearchMovie/SearchMovie";
import SearchMovieList from "../../components/SearchMovieList/SearchMovieList";
import { getSearchMovie } from "../../movie-api";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [value, setValue] = useState(query);
  const [searchMovies, setSearchMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (query) {
      async function fetchSearchMovie() {
        try {
          const data = await getSearchMovie(query);
          setSearchMovies(data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchSearchMovie();
    }
  }, [query]);

  const handleSearch = (newValue) => {
    setValue(newValue);
    setSearchParams({ query: newValue });
  };

  return (
    <div className={css.inputSearchMovie}>
      <SearchMovie value={value} onSearch={handleSearch} />
      {searchMovies.length > 0 && (
        <SearchMovieList searchMovies={searchMovies} state={location} />
      )}
    </div>
  );
}
