import { ListPaymentCard } from '@/components/PaymentCard'
import { PATH } from '@/config'
import { useQuery } from '@/hooks/useQuery'
import { userService } from '@/services/user'
import React from 'react'
import { Link } from 'react-router-dom'

export const PaymentPage = () => {
    const { data, loading, refetch } = useQuery({
        queryFn: () => userService.getPayment(),
        onSuccess: (res) => {
            res.data.sort(e => e.default ? -1 : 0)
        }
    })

    return (
        <div className="row">
            <ListPaymentCard
                data={data?.data}
                loading={!data?.data && loading}
                empty={<div className="col-12"><p>Bạn không có sổ thanh toán nào hết, vui lòng thêm địa chỉ</p></div>}
                onChangePaymentDefault={refetch}
                onDeletePayment={refetch}
            />

            <div className="col-12">
                {/* Button */}
                <Link className="btn btn-block btn-lg btn-outline-border" to={PATH.Profile.NewPayment}>
                    Add Payment Method <i className="fe fe-plus" />
                </Link>
            </div>
        </div>

    )
}
