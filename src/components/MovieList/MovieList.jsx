import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../movie-api';
import css from './MovieList.module.css'

export default function MovieList({movies}) {
    const location = useLocation();
    return (
        <div className={css.container}>
            <ul className={css.list}>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}
                            state={{ from: location }}>
                            <img src={getImageUrl(movie.poster_path)} alt={movie.title} className={css.imgFilmPoster} />
                            <p className={css.movieTitle}>{movie.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>   
    );
}