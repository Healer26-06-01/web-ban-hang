import { PATH } from '@/config'
import { currency } from '@/utils'
import moment from 'moment'
import { Link, generatePath } from 'react-router-dom'


const STATUS = {
    pending: 'Chờ xác nhận',
    confirm: 'Chờ giao hàng',
    shipping: 'Đang vận chuyển',
    finished: 'Hoàn thành',
    cancel: 'Đã hủy'
}

const TITLE_DATE = {
    pending: 'Ngày tạo đơn',
    confirm: 'Ngày xác nhận',
    shipping: 'Ngày vận chuyển',
    finished: 'Ngày nhận hàng',
    cancel: 'Ngày hủy'
}

const TITLE_DATE_FIELD = {
    pending: 'createdAt',
    confirm: 'confirmDate',
    shipping: 'shippingDate',
    finished: 'finishedDate',
    cancel: 'cancelDate'
}

export const OrderStatus = ({ order }) => {
    const { _id, status, total } = order
    const date = moment(order[TITLE_DATE_FIELD[status]])


    return (
        <div className="card card-sm">
            <div className="card-body bg-light">
                <div className="row">
                    <div className="col-6 col-lg-3">
                        {/* Heading */}
                        <h6 className="heading-xxxs text-muted">MÃ ĐƠN HÀNG:</h6>
                        {/* Text */}
                        <Link to={generatePath(PATH.Profile.OrderDetail, { id: _id })} className="text-[#111] mb-lg-0 font-size-sm font-weight-bold">
                            {_id.substring(_id.length - 6)}
                        </Link>
                    </div>
                    <div className="col-6 col-lg-3">
                        {/* Heading */}
                        <h6 className="heading-xxxs text-muted">{TITLE_DATE[status]}:</h6>
                        {/* Text */}
                        <p className="mb-lg-0 font-size-sm font-weight-bold">
                            <time dateTime="2019-09-25">
                                {date.format('DD MMM, YYYY')}
                            </time>
                        </p>
                    </div>

                    <div className="col-6 col-lg-3">
                        {/* Heading */}
                        <h6 className="heading-xxxs text-muted">Trạng thái:</h6>
                        {/* Text */}
                        <p className="mb-0 font-size-sm font-weight-bold">
                            {STATUS[status]}
                        </p>
                    </div>
                    <div className="col-6 col-lg-3">
                        {/* Heading */}
                        <h6 className="heading-xxxs text-muted">Tổng tiền:</h6>
                        {/* Text */}
                        <p className="mb-0 font-size-sm font-weight-bold">
                            {currency(total)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
