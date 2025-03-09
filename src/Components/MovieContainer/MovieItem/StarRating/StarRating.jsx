import { ConfigProvider, Rate } from 'antd';
import PropTypes from 'prop-types';
import MovieService from './../../../../Services'

const StarRating = ({ movieId = 0, movieClickedRate = 0 }) => {
    const movieService = new MovieService()

    const addRateToMovie = async (rate) => {
        if (!movieClickedRate) {
            try {
                const response = await movieService.addToRatedMovies(movieId, rate)

                if (!response.success) {
                    console.log('Error')
                }
            }
            catch (error) {
                console.log(error)
            }
        }

    }

    const rateElem = movieClickedRate ?
        <Rate disabled value={movieClickedRate} count={10} allowHalf style={{ position: 'absolute', bottom: '15px' }} /> :
        <Rate onChange={addRateToMovie} count={10} allowHalf style={{ position: 'absolute', bottom: '15px', right: '20px' }} />

    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Rate: {
                            starSize: 15,
                            marginXS: 6
                        }
                    },
                }}
            >
                {rateElem}
            </ConfigProvider>
        </div>
    );
};

export default StarRating

StarRating.propTypes = {
    movieId: PropTypes.number,
    movieClickedRate: PropTypes.number
};