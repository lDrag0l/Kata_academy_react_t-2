import './MovieItem.css'

import imageError from './notFindImage.jpg';
import StarRating from './StarRating';

import { parse, format } from 'date-fns';

import { useGenres } from '../../../Contexts/genresContext';
import Genres from './Genres';

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    let truncated = text.substring(0, maxLength);

    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
        truncated = truncated.substring(0, lastSpaceIndex) + '...';
    } else {
        truncated += '...';
    }

    return truncated;
}

function MovieItem({ movieTitle = '', movieText = '', movieRate = 0, movieReleaseDate = '', movieImage = imageError, movieGenres = [] }) {
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

    const formattedText = truncateText(movieText, 200)

    const formattedRate = parseFloat(movieRate).toFixed(1);

    return (
        <div className="movie-card card">
            <img className='card__image' alt='card image' src={imageSrc || imageError} />
            <div className='card__info'>
                <div className='card__header'>
                    <h1 className='card__title'>{movieTitle}</h1>
                    <div className='card__score'>{formattedRate}</div>
                </div>
                <div className='card__release'>{formattedDate}</div>
                <div className='card__genres-wrapper'>
                    {genreNames.map((text) => {
                        return <Genres key={text} genreText={text} />
                    })}
                </div>
                <p className='card__text'>
                    {formattedText}
                </p>
                <StarRating />
            </div>
        </div>
    )
}

export default MovieItem