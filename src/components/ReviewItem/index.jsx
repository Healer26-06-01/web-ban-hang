import { withListLoading } from '@/utils/withListLoading'
import moment from 'moment'
import React from 'react'
import { Skeleton } from '../Skeleton'


const Loading = () => {
    return (
        <div className="review">
            <div className="review-body">
                <div className="row">
                    <div className="col-12 col-md-auto">
                        {/* Avatar */}
                        <div className="avatar avatar-xxl mb-6 mb-md-0">
                            <Skeleton shape="circle" width={100} height={100}/>
                        </div>
                    </div>
                    <div className="col-12 col-md">
                        {/* Header */}
                        <div className="row mb-6">
                            <div className="col-12">
                                {/* Rating */}
                                <Skeleton width={85} height={15}/>
                            </div>
                            <div className="col-12">
                                {/* Time */}
                                <span className="font-size-xs text-muted">
                                     <Skeleton height={24} width={300}/>
                                </span>
                            </div>
                        </div>
                        {/* Text */}
                        <p className="text-gray-500">
                            <Skeleton height={48}/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ReviewItem = ({ star, content, user, createdAt }) => {
    return (
        <div className="review">
            <div className="review-body">
                <div className="row">
                    <div className="col-12 col-md-auto">
                        {/* Avatar */}
                        <div className="avatar avatar-xxl mb-6 mb-md-0">
                            <div className="w-[100px] h-[100px] overflow-hidden rounded-full">
                                <img className="w-full h-full object-cover" src={user.avatar}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md">
                        {/* Header */}
                        <div className="row mb-6">
                            <div className="col-12">
                                {/* Rating */}
                                <div className="rating font-size-sm text-dark" data-value={star}>
                                    <div className="rating-item">
                                        <i className="fas fa-star" />
                                    </div>
                                    <div className="rating-item">
                                        <i className="fas fa-star" />
                                    </div>
                                    <div className="rating-item">
                                        <i className="fas fa-star" />
                                    </div>
                                    <div className="rating-item">
                                        <i className="fas fa-star" />
                                    </div>
                                    <div className="rating-item">
                                        <i className="fas fa-star" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                {/* Time */}
                                <span className="font-size-xs text-muted">
                                    {user.name}, <time dateTime="2019-07-25">{moment(createdAt).format('DD MMM, YYYY')}</time>
                                </span>
                            </div>
                        </div>
                        {/* Text */}
                        <p className="text-gray-500">
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const ListReview = withListLoading(ReviewItem, Loading)