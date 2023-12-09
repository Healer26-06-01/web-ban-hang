import { currency } from '@/utils'
import moment from 'moment'
import { Button } from '../Button'
import { Link, generatePath } from 'react-router-dom'
import { PATH } from '@/config'
import { Skeleton } from '../Skeleton'
import { withListLoading } from '@/utils/withListLoading'
import { useQuery } from '@/hooks/useQuery'
import { orderService } from '@/services/order'
import { Paginate } from '../Paginate'
import queryString from 'query-string'
import { useSearch } from '@/hooks/useSearch'
import { OrderStatus } from '../OrderStatus'


const Loading = () => {
    return (
        <div className="card card-lg mb-5 border">
            <div className="card-body pb-0">
                {/* Info */}
                <div className="card card-sm">
                    <Skeleton height={89.49} />
                </div>
            </div>
            <div className="card-footer">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-6">
                        <div className="form-row mb-4 mb-lg-0">
                            <div className="col-3">
                                <Skeleton className="embed-responsive embed-responsive-1by1 bg-cover" />
                            </div>

                            <div className="col-3">
                                <Skeleton className="embed-responsive embed-responsive-1by1 bg-cover" />
                            </div>

                            <div className="col-3">
                                <Skeleton className="embed-responsive embed-responsive-1by1 bg-cover" />
                            </div>

                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="flex justify-end gap-3">
                            <Skeleton height={40} width={100} />
                            <Skeleton height={40} width={80} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const OrderCard = (props) => {
    const { status, total, _id, createdAt, listItems, finishedDate } = props
    const checkReturn = status === 'finished' && moment(finishedDate) > moment().add(-7, 'd')

    const date = moment(status === 'finished' ? finishedDate : createdAt)

    return (
        <div className="card card-lg mb-5 border">
            <div className="card-body pb-0">
                {/* Info */}
                <OrderStatus order={props} />
            </div>
            <div className="card-footer">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-6">
                        <div className="form-row mb-4 mb-lg-0">
                            {
                                listItems.slice(0, 3).map(e => <div key={e.productId} className="col-3">
                                    {/* Image */}
                                    <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{ backgroundImage: `url(${e.product.thumbnail_url})` }} />
                                </div>)
                            }
                            {listItems.length === 4 && <div className="col-3">
                                {/* Image */}
                                <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{ backgroundImage: `url(${listItems[3].product.thumbnail_url})` }} />
                            </div>}
                            {
                                listItems.length > 4 && (
                                    <div className="col-3">
                                        {/* Image */}
                                        <div className="embed-responsive embed-responsive-1by1 bg-light">
                                            <a className="embed-responsive-item embed-responsive-item-text text-reset" href="#!">
                                                <div className="font-size-xxs font-weight-bold">
                                                    +{listItems.length - 3} <br /> ảnh
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                )
                            }



                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="flex justify-end gap-3">
                            {/* <a className="btn btn-xs btn-outline-dark" href="#!">Hủy đơn</a> */}
                            {checkReturn && <Button className="btn-xs" outline>Đổi trả</Button>}
                            {['finished', 'cancel'].includes(status) && <Button className="btn-xs" outline>Mua lại</Button>}
                            {status === 'pending' && <Button className="btn-xs" outline>Hủy đơn</Button>}
                            <Link className="btn btn-xs btn-outline-dark" to={generatePath(PATH.Profile.OrderDetail, { id: _id })}>Xem chi tiết</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const ListOrderItem = withListLoading(OrderCard, Loading)


export const ListOrder = ({ status }) => {
    const [search] = useSearch({
        page: 1
    })
    const qs = queryString.stringify({
        page: search.page,
        status
    })
    const { data: data, loading } = useQuery({
        queryKey: [qs],
        queryFn: () => orderService.getOrder(`?${qs}`)
    })

    return (
        <>

            <ListOrderItem
                data={data?.data}
                loading={loading}
                loadingCount={5}
                empty={<div className="flex items-center flex-col gap-5 text-center">
                    <img width={200} src="/img/empty-order.png" alt />
                    <p>Chưa có đơn hàng nào</p>
                </div>}
            />

            <Paginate totalPage={data?.paginate?.totalPage} />
        </>
    )
}
