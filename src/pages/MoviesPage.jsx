import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';
import css from '../css/MoviesPage.module.css';

export default function MoviesPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const query = searchParams.get('query') || '';
            if (query) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
                        headers: {
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmVlODg4OWY0N2JhZWVmYTMwY2JkYmZjMWI4ZjQ4NiIsIm5iZiI6MTcyMzY1NzQzNS40NDYwNDksInN1YiI6IjY2YmNiMjU4YzJmZGRkMDZjMjgyNWUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cE1nO8P2hUF-jj-lOl17ZA1vzHOp_xdvLkzvOMjRwfs`
                        }
                    });
                    setMovies(response.data.results);
                    setError(null);
                } catch (error) {
                    setError('Failed to fetch movies. Please try again.');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchMovies();
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ query });
    };

    return (
        <div className={css.container}>
            <form onSubmit={handleSearch} className={css.form}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies"
                    className={css.formInput}
                />
                <button type="submit" className={css.formBtn}>Search</button>
            </form>
            {loading && <p className={css.loading}>Loading page... Please wait!</p>}
            {error && <p className={css.error}>No movies found for your query. Try searching for something else!</p>}
            <MovieList movies={movies} />
        </div>
    );
}
