import { useQuery } from "@/hooks/useQuery"
import { ListProductCard } from "../ProductCard"
import { productService } from "@/services/product"
import { Link } from "react-router-dom"

export const ListProduct = ({ query, link }) => {
    const { data, loading } = useQuery({
        queryFn: () => productService.getProduct(query)
    })
    return (
        <>

            <div className="row">
                <ListProductCard
                    loading={loading}
                    loadingCount={8}
                    data={data?.data}
                    className="col-xl-3"
                />
            </div>
            <div className="row">
                <div className="col-12">
                    {/* Link  */}
                    <div className="mt-7 text-center">
                        <Link className="link-underline" to={link}>Discover more</Link>
                    </div>
                </div>
            </div>

        </>
    )
}
