import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../movie-api';
import css from './MovieReviews.module.css'

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData = await getMovieReviews(movieId);
                setReviews(reviewsData);
            } catch (error) {
                setError('Sorry! We don`t have any reviews for this movie');
            }
        };
        fetchReviews();
    }, [movieId]);

    return (
        <div className={css.container}>
            <h2 className={css.title}>Reviews</h2>
            {error && <p className={css.error}>Sorry! We don&apos;t have any reviews for this movie</p>}
            <ul className={css.list}>
                {reviews.map(review => (
                    <li key={review.id} className={css.listItem}>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
