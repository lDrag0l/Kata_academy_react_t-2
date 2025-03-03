import { Tabs } from 'antd';

const HeaderRadio = ({ onChangeTab = () => { } }) => {

    return (
        <Tabs
            onChange={onChangeTab}
            defaultActiveKey="1"
            centered
            items={Array.from({
                length: 2,
            }).map((_, i) => {
                const id = i;
                const label = i === 0 ? 'Search' : 'Rated'
                return {
                    label: `${label}`,
                    key: id,
                };
            })}
        />
    );
}

export default HeaderRadio