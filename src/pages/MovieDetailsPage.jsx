import { useState, useEffect, Suspense, useRef } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getImageUrl } from '../movie-api';
import css from '../css/MovieDetailsPage.module.css'

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from || "/movies");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await axios.get(`/movie/${movieId}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmVlODg4OWY0N2JhZWVmYTMwY2JkYmZjMWI4ZjQ4NiIsIm5iZiI6MTcyMzY1NzQzNS40NDYwNDksInN1YiI6IjY2YmNiMjU4YzJmZGRkMDZjMjgyNWUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cE1nO8P2hUF-jj-lOl17ZA1vzHOp_xdvLkzvOMjRwfs`
                }
            });
            setMovie(response.data);
        };
        fetchMovieDetails();
    }, [movieId]);

    const goBack = () => {
        navigate(backLinkRef.current);
    };

    return (
        <div className={css.container}>
            {movie && (
                <>
                    <button onClick={goBack} className={css.goBackBtn}>Go back</button>
                    <div className={css.aboutMovie}>
                        <img src={getImageUrl(movie.poster_path)} alt={movie.title} className={css.imgMoviePoster} />
                        <div className={css.aboutMovieBlock}>
                            <h1 className={css.titleName}>{movie.title}</h1>
                            <h3>Overview</h3>
                            <p>{movie.overview}</p>
                                <ul>
                                    <li>
                                        <Link to="cast">Cast</Link>
                                    </li>
                                    <li>
                                        <Link to="reviews">Reviews</Link>
                                    </li>
                                </ul>
                            </div>
                    </div>
                    <Suspense fallback={
                        <div className={css.loading}>Loading page... Please wait for response</div>
                    }>
                        <Outlet />
                    </Suspense>
                </>
            )}
        </div>
    );
}