import { Pagination } from 'antd';
import './FooterPagination.css'
function FooterPagination({ onChangePage = () => { }, paginationState = false, page = 0, totalPages = 0 }) {
    if (paginationState) {
        return (
            <Pagination current={page} align="center" onChange={onChangePage} defaultCurrent={1} defaultPageSize={20} showSizeChanger={false} total={totalPages} />
        )
    }

}

export default FooterPagination