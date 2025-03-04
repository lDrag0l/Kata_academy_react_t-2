import HeaderInput from "./HeaderInput";
import HeaderRadio from "./HeaderRadio/HeaderRadio";

function Header({ onChangeInput = () => { }, onChangeTab = () => { }, tabState = 0, inputValue = '' }) {
    return (
        <>
            <HeaderRadio onChangeTab={onChangeTab} />
            {tabState === 0 && <HeaderInput inputValue={inputValue} onChangeInput={onChangeInput} />}
        </>
    );
}

export default Header;
