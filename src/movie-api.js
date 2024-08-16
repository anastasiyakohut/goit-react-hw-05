import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmVlODg4OWY0N2JhZWVmYTMwY2JkYmZjMWI4ZjQ4NiIsIm5iZiI6MTcyMzY1NzQzNS40NDYwNDksInN1YiI6IjY2YmNiMjU4YzJmZGRkMDZjMjgyNWUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cE1nO8P2hUF-jj-lOl17ZA1vzHOp_xdvLkzvOMjRwfs`;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const IMAGE_SIZE = 'w500';

export const getTrendingMovies = async () => {
    const response = await axios.get('/trending/movie/day');
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await axios.get('/search/movie', { params: { query } });
    return response.data.results;
};

export const getMovieDetails = async (movieId) => {
    const response = await axios.get(`/movie/${movieId}`);
    return response.data;
};

export const getMovieCast = async (movieId) => {
    const response = await axios.get(`/movie/${movieId}/credits`);
    return response.data.cast;
};

export const getActorImg = (filePath) => {
    if (!filePath) {
        return 'https://via.placeholder.com/100';
    }
    return `${IMAGE_BASE_URL}/${IMAGE_SIZE}${filePath}`;
};

export const getMovieReviews = async (movieId) => {
    const response = await axios.get(`/movie/${movieId}/reviews`);
    return response.data.results;
};

export const getImageUrl = (filePath) => {
    if (!filePath) {
        return 'https://via.placeholder.com/100';
    }
    return `${IMAGE_BASE_URL}/${IMAGE_SIZE}${filePath}`;
};