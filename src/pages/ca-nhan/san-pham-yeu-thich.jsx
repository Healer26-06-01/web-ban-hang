import { Paginate } from '@/components/Paginate'
import { Portal } from '@/components/Portal'
import { ProductCard, ProductCardLoading, ListProductCard } from '@/components/ProductCard'
import { PROFILE_TITLE_ID } from '@/config'
import { useQuery } from '@/hooks/useQuery'
import { useSearch } from '@/hooks/useSearch'
import { productService } from '@/services/product'
import queryString from 'query-string'
import React from 'react'

export const WishlistPage = () => {
    const [search] = useSearch({
        page: 1
    })

    const qs = queryString.stringify({
        page: search.page
    })

    const { loading, data, refetch: fetchWishlist, clearPreviousData } = useQuery({
        queryKey: [qs],
        queryFn: () => productService.getWishlist(`?${qs}`),
        keepPrevousData: true
    })


    return (
        <>
            <Portal selector={PROFILE_TITLE_ID}>
                Sản phẩm yêu thích
            </Portal>
            <div>
                {/* Products */}
                <div className="row">
                    <ListProductCard
                        loadingCount={15}
                        loading={loading}
                        data={data?.data}
                        showRemove
                        onRemoveWishlistSuccess={() => {
                            clearPreviousData()
                            fetchWishlist()
                        }}
                    />
                </div>
                {/* Pagination */}
                <Paginate totalPage={data?.paginate?.totalPage} />
            </div>

        </>
    )
}
