import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import NotFound from "./pages/NotFoundPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import "./App.module.css";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
