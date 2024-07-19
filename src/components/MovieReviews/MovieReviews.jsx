import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../movie-api";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const data = await getMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {}
    }
    fetchMovieReviews();
  }, [movieId]);
  if (!movieReviews) {
    return <div>Loading...</div>;
  }
  if (movieReviews.length === 0) {
    return <p>There are no reviews for this movie.</p>;
  }
  console.log("movieReviews777: ", movieReviews);
  return (
    <ul>
      {movieReviews.map((movieReview, index) => (
        <li key={index}>
          <p>
            <b>{movieReview.author}</b>
          </p>
          <p>{movieReview.content}</p>
        </li>
      ))}
    </ul>
  );
}
