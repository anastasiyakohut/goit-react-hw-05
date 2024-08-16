import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast, getActorImg } from '../../movie-api';
import css from './MovieCast.module.css'

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const castData = await getMovieCast(movieId);
                setCast(castData);
            } catch (error) {
                console.error("Failed to fetch cast data:", error);
            }
        };
        fetchCast();
    }, [movieId]);

    return (
        <div className={css.container}>
            <h2 className={css.title}>Cast</h2>
            <ul className={css.list}>
                {cast.map(actor => (
                    <li key={actor.cast_id} className={css.listItem}>
                        <img src={getActorImg(actor.profile_path)} alt={actor.title} className={css.listImg} />
                        <h4 className={css.actorName}>{actor.name}</h4>
                        <p className={css.actorCharacter}>Character: {actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
