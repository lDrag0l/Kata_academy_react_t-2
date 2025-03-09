import { useEffect, useState } from "react";

import MovieItem from "../MovieContainer/MovieItem";
import MovieService from './../../Services';

import { Alert, Spin } from "antd";
import FooterPagination from "../FooterPagination";

const RatedMovies = () => {
    const [hasData, setHasData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [ratedMovies, setRatedMovies] = useState([]);
    const [isPaginationVisible, setPaginationStateVisible] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const movieService = new MovieService();

    useEffect(() => {
        const getRatedMovies = async (page) => {

            const guestSessionId = localStorage.getItem('guest_session_id');
            if (!guestSessionId) {
                return;
            }

            setLoading(true);
            try {
                const response = await movieService.getRatedMovies(page);
                if (!response.success) {
                    setHasData(false);
                    setError(true);
                } else {
                    setHasData(true);
                    setTotalPages(response.data.total_results)
                    setRatedMovies(response.data.results);
                    setPaginationStateVisible(response.data.results.length !== 0);
                }
            }

            catch (error) {
                setError(true);
            }

            finally {
                setLoading(false);
            }
        };

        const fetchRatedMovies = async (page) => {
            await getRatedMovies(page);
        };

        fetchRatedMovies(page);
    }, [page]);

    const onChangePage = (page) => {
        setPage(page);
    };


    const readyToPush = !(loading || error);
    const spinner = loading ? <Spin size="large" /> : null;
    const alertMessage = error ? <Alert message="Something went wrong" type="info" /> : null;

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
        <>
            <div className='movie-container'>
                {spinner}
                {alertMessage}
                {content}
            </div>
            {readyToPush && <FooterPagination totalPages={totalPages} page={page} isPaginationVisible={isPaginationVisible} onChangePage={onChangePage} />}
        </>
    );
};

export default RatedMovies;
