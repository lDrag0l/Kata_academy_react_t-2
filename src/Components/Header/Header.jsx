import HeaderInput from "./HeaderInput";
import HeaderRadio from "./HeaderRadio/HeaderRadio";
import PropTypes from 'prop-types';

function Header({ onChangeInput = () => { }, onChangeTab = () => { }, tabState = 0, inputValue = '' }) {
    return (
        <>
            <HeaderRadio onChangeTab={onChangeTab} />
            {tabState === 0 && <HeaderInput inputValue={inputValue} onChangeInput={onChangeInput} />}
        </>
    );
}

export default Header;

Header.propTypes = {
    onChangeInput: PropTypes.func,
    onChangeTab: PropTypes.func,
    tabState: PropTypes.number,
    inputValue: PropTypes.string
};
