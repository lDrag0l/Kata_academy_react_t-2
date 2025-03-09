import './Genre.css'
import PropTypes from 'prop-types';

const Genres = ({ genreText = '' }) => {
    return (
        <div className='card__genres'>
            {genreText}
        </div>
    )
}

export default Genres

Genres.propTypes = {
    genreText: PropTypes.string
};