import { useEffect, useRef, useState } from "react";
import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";
import { Suspense } from "react";
import { getMovieById } from "../../movie-api";
import { GoArrowLeft } from "react-icons/go";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const location = useLocation();

  const imgBaseUrl = "https://image.tmdb.org/t/p/w200";
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieById(movieId);
        setMovieDetail(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovie();
  }, [movieId]);

  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  const { poster_path, title, overview, genres, vote_average } = movieDetail;

  return (
    <>
      <div className={css.goBack}>
        <Link to={backLinkRef.current}>
          <GoArrowLeft /> Go Back
        </Link>
      </div>
      <div className={css.detailContent}>
        {poster_path && <img src={imgBaseUrl + poster_path} alt={title} />}
        <div className={css.description}>
          <h2>{title}</h2>
          <p>vote_average {vote_average}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((genre) => `${genre.name} `)}</p>
        </div>
      </div>
      <div>
        <ul className={css.moveDetailsList}>
          <li>
            <NavLink to="cast" className={css.link}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={css.link}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
