import { Pagination } from 'antd';
import './FooterPagination.css'
function FooterPagination(props) {
    let { onChangePage, paginationState, page } = props
    if (paginationState) {
        return (
            <Pagination current={page} align="center" onChange={onChangePage} defaultCurrent={1} defaultPageSize={20} showSizeChanger={false} total={100} />
        )
    }

}

export default FooterPagination