import MovieItem from './MovieItem'
import './MovieContainer.css'
function MovieContainer(props) {
    const { movies } = props

    return (
        <div className='movie-container'>
            {movies.map((movie) => {
                return (<MovieItem
                    key={movie.id}
                    movieImage={movie.poster_path}
                    movieTitle={movie.original_title}
                    movieText={movie.overview}
                    movieRate={movie.vote_average}
                    movieReleaseDate={movie.release_date}

                />)
            })}
        </div>
    )
}

export default MovieContainer