import { Pagination } from 'antd';
import './FooterPagination.css'
function FooterPagination() {
    return (
        <Pagination align="center" defaultCurrent={1} defaultPageSize={20} showSizeChanger={false} total={100} />
    )
}

export default FooterPagination