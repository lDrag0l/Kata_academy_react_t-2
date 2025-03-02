import HeaderInput from "./HeaderInput"
import HeaderRadio from "./HeaderRadio/HeaderRadio"


function Header(props) {
    const { onChangeInput } = props
    return (
        <>
            <HeaderRadio />
            <HeaderInput onChangeInput={onChangeInput} />
        </>
    )
}

export default Header