import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../movie-api';
import MovieList from '../components/MovieList/MovieList';
import css from '../css/HomePage.module.css'

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getTrendingMovies();
            setMovies(movies);
        };
        fetchMovies();
    }, []);

    return (
        <div>
            <h1 className={css.title}>Trending now</h1>
            <MovieList movies={movies} />
        </div>
        
    );
}