import { Rate } from 'antd';
import './StarRating.css'
const StarRating = ({ rating }) => {
    return (
        <div>
            <Rate disabled allowHalf defaultValue={rating} style={{ color: '#ffd700', position: 'absolute', bottom: '15px' }} />
        </div>
    );
};

export default StarRating