import { Suspense, lazy } from "react";

import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation"
import css from './App.module.css'

const HomePage = lazy(() => import('../../pages/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));


export default function App() {
  return (
    <div className={css.container}>
      <Navigation />

      <Suspense fallback={<div>Please wait... Page is loading</div>}>
        <div className={css.mainContent}> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>
      
    </div>
  )

}