import { useEffect, useState } from "react";
import { getMovieCredits } from "../../movie-api";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState();
  const imgBaseUrl = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    async function fetchMovieCredits() {
      try {
        const data = await getMovieCredits(movieId);

        setMovieCredits(data.cast);
      } catch (error) {}
    }
    fetchMovieCredits();
  }, [movieId]);
  if (!movieCredits) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={css.castList}>
      {movieCredits.map(({ id, profile_path, name }) => {
        return (
          <>
            <li key={id} className={css.castListItem}>
              <div>
                {profile_path !== null && (
                  <img src={imgBaseUrl + profile_path} />
                )}
              </div>
              <div>{name}</div>
            </li>
          </>
        );
      })}
    </ul>
  );
}
