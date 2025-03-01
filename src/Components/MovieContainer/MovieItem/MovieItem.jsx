import './MovieItem.css'
import StarRating from './StarRating';
import { parse, format } from 'date-fns';
import imageError from './notFindImage.jpg';

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

function MovieItem(props) {
    const { movieTitle, movieText, movieRate, movieReleaseDate, movieImage } = props
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
    else {
        imageSrc = imageError
    }

    const formattedText = truncateText(movieText, 200)

    const formattedRate = parseFloat(movieRate).toFixed(1);

    return (
        <div className="movie-card card">
            <img className='card__image' alt='card image' src={imageSrc} />
            <div className='card__info'>
                <div className='card__header'>
                    <h1 className='card__title'>{movieTitle}</h1>
                    <div className='card__score'>{formattedRate}</div>
                </div>
                <div className='card__release'>{formattedDate}</div>
                <div className='card__genres'>Action</div>
                <p className='card__text'>
                    {formattedText}
                </p>
                <StarRating rating={formattedRate} />
            </div>
        </div>
    )
}

export default MovieItem