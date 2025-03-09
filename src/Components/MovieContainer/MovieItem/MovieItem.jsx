import './MovieItem.css'

import imageError from './notFindImage.jpg';
import StarRating from './StarRating';

import { parse, format } from 'date-fns';
import PropTypes from 'prop-types';

import { useGenres } from '../../../Contexts/genresContext';
import Genre from './Genre';
import { truncateText } from './../../../Utils/MovieUtils'


function MovieItem({ movieId = 0, movieTitle = '', movieText = '', movieRate = 0, movieReleaseDate = '', movieImage = imageError, movieGenres = [], movieClickedRate = 0, onFirstClickRateMovie = () => { } }) {
    const { genres } = useGenres()

    const genreNames = movieGenres.map(id => {
        const genre = genres.find(genre => genre.id === id);
        return genre.name
    })

    let date
    let formattedDate
    let imageSrc

    if (movieReleaseDate) {
        date = parse(movieReleaseDate, 'yyyy-MM-dd', new Date());
        formattedDate = format(date, 'MMMM d, yyyy');
    }

    if (movieImage) {
        imageSrc = 'https://image.tmdb.org/t/p/w500' + movieImage
    }
    const colors = {
        red: "#E90000",
        orange: "#E97E00",
        yellow: "#E9D100",
        green: "#66E900"
    };

    const formattedText = truncateText(movieText, 200)

    const formattedRate = parseFloat(movieRate).toFixed(1);

    let cardScoreColor

    if (formattedRate >= 7) {
        cardScoreColor = colors.green
    } else if (formattedRate > 5 && formattedRate < 7) {
        cardScoreColor = colors.yellow
    } else if (formattedRate >= 3 && formattedRate < 5) {
        cardScoreColor = colors.orange
    }
    else if (formattedRate >= 0 && formattedRate < 3) {
        cardScoreColor = colors.red
    }

    return (
        <div className="movie-card card">
            <img className='card__image' alt='card image' src={imageSrc || imageError} />
            <div className='card__info'>
                <div className='card__header'>
                    <img className='card__image--small' alt='card image' src={imageSrc || imageError} />
                    <h1 className='card__title'>{movieTitle}</h1>
                    <div style={{ border: `2px solid ${cardScoreColor}` }} className='card__score'>{formattedRate}</div>
                </div>
                <div className='card__release'>{formattedDate}</div>
                <div className='card__genres-wrapper'>
                    {genreNames.map((text) => {
                        return <Genre key={text} genreText={text} />
                    })}
                </div>
                <p className='card__text'>
                    {formattedText}
                </p>
                <StarRating onFirstClickRateMovie={onFirstClickRateMovie} movieClickedRate={movieClickedRate} movieId={movieId} />
            </div>
        </div >
    )
}

export default MovieItem

MovieItem.propTypes = {
    movieId: PropTypes.number,
    movieTitle: PropTypes.string,
    movieText: PropTypes.string,
    movieRate: PropTypes.number,
    movieReleaseDate: PropTypes.string,
    movieImage: PropTypes.string,
    movieGenres: PropTypes.array,
    movieClickedRate: PropTypes.number,
    onFirstClickRateMovie: PropTypes.func
};