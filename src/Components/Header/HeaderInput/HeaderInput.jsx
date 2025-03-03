import { Input } from 'antd';

const HeaderInput = ({ onChangeInput = () => { }, inputValue = '' }) => {
    return (
        <div className='App__input' >
            <Input defaultValue={inputValue} onInput={onChangeInput} placeholder="Type to search..." />
        </div>
    )
}

export default HeaderInput
