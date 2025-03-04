import { useEffect, useState } from "react";

import MovieItem from "../MovieContainer/MovieItem";
import MovieService from './../../Services';

import { Alert, Spin } from "antd";

const RatedMovies = () => {
    const [ratedMovies, setRatedMovies] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const movieService = new MovieService();

    useEffect(() => {
        const fetchRatedMovies = async () => {
            await getRatedMovies();
        };

        fetchRatedMovies();
    }, []);

    const getRatedMovies = async () => {

        const guestSessionId = localStorage.getItem('guest_session_id');
        if (!guestSessionId) {
            createGuestSession();
            return;
        }

        setLoading(true);
        try {
            const response = await movieService.getRatedMovies();

            if (!response.success) {
                setHasData(false);
                setError(true);
            } else {
                setHasData(true);
                setRatedMovies(response.data.results);
            }
        }

        catch (error) {
            setError(true);
        }

        finally {
            setLoading(false);
        }
    };

    const readyToPush = !(loading || error);
    const spinner = loading ? <Spin size="large" /> : null;
    const alertMessage = error ? <Alert message="No saved movies" type="info" /> : null;

    let content;

    if (hasData && readyToPush) {
        content = ratedMovies.map((movie) => (
            <MovieItem
                key={movie.id}
                movieId={movie.id}
                movieGenres={movie.genre_ids}
                movieImage={movie.poster_path}
                movieTitle={movie.original_title}
                movieText={movie.overview}
                movieRate={movie.vote_average}
                movieReleaseDate={movie.release_date}
                movieClickedRate={movie.rating}
            />
        ));
    }

    return (
        <div className='movie-container'>
            {spinner}
            {alertMessage}
            {content}
        </div>
    );
};

export default RatedMovies;
