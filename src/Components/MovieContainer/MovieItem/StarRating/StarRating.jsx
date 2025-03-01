import { ConfigProvider, Rate } from 'antd';
import './StarRating.css'
const StarRating = ({ rating }) => {
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
                <Rate count={10} disabled allowHalf defaultValue={rating} style={{ position: 'absolute', bottom: '15px' }} />
            </ConfigProvider>
        </div>
    );
};

export default StarRating