import { Input } from 'antd';
import PropTypes from 'prop-types';

const HeaderInput = ({ onChangeInput = () => { }, inputValue = '' }) => {
    return (
        <div className='App__input' >
            <Input defaultValue={inputValue} onInput={onChangeInput} placeholder="Type to search..." />
        </div>
    )
}

export default HeaderInput


HeaderInput.propTypes = {
    onChangeInput: PropTypes.func,
    inputValue: PropTypes.string
};


