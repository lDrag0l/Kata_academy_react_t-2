import { Input } from 'antd';
import { useState } from 'react';

const HeaderInput = (props) => {
    const { onChangeInput } = props
    return (
        <div className='App__input' >
            <Input onInput={onChangeInput} placeholder="Type to search..." />
        </div>
    )
}

export default HeaderInput
