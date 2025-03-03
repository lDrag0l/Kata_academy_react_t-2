import './Genres.css'

const Genres = ({ genreText = '' }) => {
    return (
        <div className='card__genres'>
            {genreText}
        </div>
    )
}

export default Genres