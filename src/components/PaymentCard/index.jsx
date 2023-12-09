import { withListLoading } from '@/utils/withListLoading'
import React from 'react'
import { Skeleton } from '../Skeleton'
import { Link, generatePath } from 'react-router-dom'
import { PATH } from '@/config'
import moment from 'moment'
import { PaymentCardStyle } from './style'
import { Button } from '../Button'
import { handleError } from '@/utils'
import { userService } from '@/services/user'
import { message } from 'antd'
import { useAction } from '@/hooks/useAction'

export const PaymentCard = ({ onDeletePayment, onChangePaymentDefault, _id, type, cardNumber, cardName, expired, default: paymentDefault }) => {
    const t = expired.split('/')
    const month = t[0]
    const year = t[1]

    const _onChangePaymentDefault = useAction({
        service: () => userService.editPayment(_id, { default: true }),
        loadingMessage: 'Thao tác đang được thực hiện',
        successMessage: 'Thay đổi sổ thanh toán mặc định thành công',
        onSuccess: onChangePaymentDefault
    })

    // const _onChangePaymentDefault = async () => {
    //     try {
    //         const key = 'change-payment-default'
    //         message.loading({
    //             key,
    //             content: 'Thao tác đang được thực hiện'
    //         })
    //         await userService.editPayment(_id, { default: true })
    //         onChangePaymentDefault?.()


    //         message.success({
    //             key,
    //             content: 'Thay đổi sổ thanh toán mặc định thành công'
    //         })
    //     } catch (err) {
    //         handleError(err)
    //     }
    // }

    const _onDeletePayment = useAction({
        service: () => userService.removePayment(_id),
        loadingMessage: 'Đang xóa sổ thanh toán',
        successMessage: 'Xóa sổ thanh toán thành công',
        onSuccess: onDeletePayment,
        retry: false
    })

    // const _onDeletePayment = async () => {
    //     const key = 'delete-payment'
    //     try {
    //         message.loading({
    //             key,
    //             content: 'Đang xóa sổ thanh toán'
    //         })
    //         await userService.removePayment(_id)
    //         onDeletePayment?.()

    //         message.success({
    //             key,
    //             content: 'Xóa sổ thanh toán thành công'
    //         })
    //     } catch (err) {
    //         handleError(err, key)
    //     }
    // }

    return (
        <PaymentCardStyle className="col-12">
            <div className="payment-card card card-lg bg-light mb-8">
                <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-6">
                        {type === 'card' ? 'Debit / Credit Card' : 'Paypall'}
                    </h6>
                    {/* Text */}
                    <p className="mb-5">
                        <strong>Card Number:</strong>
                        <span className="text-muted">{cardNumber}</span>
                    </p>
                    {/* Text */}
                    <p className="mb-5">
                        <strong>Expiry Date:</strong>
                        <span className="text-muted">{moment(`${month}/01/${year}`).format('MMM, YYYY')}</span>
                    </p>
                    {/* Text */}
                    <p className="mb-0">
                        <strong>Name on Card:</strong>
                        <span className="text-muted">{cardName}</span>
                    </p>
                    {
                        paymentDefault ? <div className="card-action-right-bottom">
                            <a href="#" className="color-success">
                                Thanh toán mặc định
                            </a>
                        </div> : (
                            <Button onClick={_onChangePaymentDefault} outline className="hidden btn-change-default btn-xs">
                                Đặt làm mặc định
                            </Button>
                        )
                    }

                    {/* Action */}
                    <div className="card-action card-action-right flex gap-2">
                        {/* Button */}
                        <Link className="btn btn-xs btn-circle btn-white-primary" to={generatePath(PATH.Profile.EditPayment, { id: _id })}>
                            <i className="fe fe-edit-2" />
                        </Link>

                        {
                            !paymentDefault && (
                                <button onClick={_onDeletePayment} className="btn btn-xs btn-circle btn-white-primary">
                                    <i className="fe fe-x" />
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </PaymentCardStyle>
    )
}


const PaymentCardLoading = () => {
    return (
        <div className="col-12">

            <div className="payment-card card card-lg bg-light mb-8" style={{ height: 224 }}>
                <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-6">
                        <Skeleton height={24} />
                    </h6>
                    <p className="mb-5">
                        <Skeleton height={22} />

                    </p>
                    <p className="mb-5">
                        <Skeleton height={22} />

                    </p>
                    <p className="mb-0">
                        <Skeleton height={22} />

                    </p>
                </div>
            </div>
        </div>
    )
}

export const ListPaymentCard = withListLoading(PaymentCard, PaymentCardLoading)