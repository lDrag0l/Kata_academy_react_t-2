import { ConfigProvider, Rate } from 'antd';

const StarRating = () => {
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
                <Rate count={10} allowHalf style={{ position: 'absolute', bottom: '15px' }} />
            </ConfigProvider>
        </div>
    );
};

export default StarRating