import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './FooterPagination.css'

function FooterPagination({ onChangePage = () => { }, isPaginationVisible = false, page = 0, totalPages = 0 }) {
    if (isPaginationVisible && totalPages > 20) {
        return (
            <Pagination current={page} align="center" onChange={onChangePage} defaultCurrent={1} defaultPageSize={20} showSizeChanger={false} total={totalPages} />
        )
    }

}

export default FooterPagination

FooterPagination.propTypes = {
    onChangePage: PropTypes.func,
    isPaginationVisible: PropTypes.bool,
    page: PropTypes.number,
    totalPages: PropTypes.number,
};

