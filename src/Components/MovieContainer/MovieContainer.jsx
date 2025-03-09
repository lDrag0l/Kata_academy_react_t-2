import MovieItem from './MovieItem'
import './MovieContainer.css'
import PropTypes from 'prop-types';

function MovieContainer({ movies = [] }) {
    return (
        <div className='movie-container'>
            {movies.map((movie) => {
                return (<MovieItem
                    key={movie.id}
                    movieId={movie.id}
                    movieGenres={movie.genre_ids}
                    movieImage={movie.poster_path}
                    movieTitle={movie.original_title}
                    movieText={movie.overview}
                    movieRate={movie.vote_average}
                    movieReleaseDate={movie.release_date}
                    movieClickedRate={movie.movieClickedRate}
                />)
            })}
        </div>
    )
}

export default MovieContainer

MovieContainer.propTypes = {
    movies: PropTypes.array
};