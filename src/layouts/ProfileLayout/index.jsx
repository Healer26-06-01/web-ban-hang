import { PATH } from "@/config"
import { logoutAction } from "@/stores/auth"
import { Helmet } from "react-helmet"
import { useDispatch } from "react-redux"
import { Link, NavLink, Outlet } from "react-router-dom"

export const ProfileLayout = () => {
    const dispatch = useDispatch()
    return (
        <section className="pt-7 pb-12">
            <Helmet>
                <title>Tải khoản</title>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {/* Heading */}
                        <h3 className="mb-10" id="profile-title"></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-3">
                        {/* Nav */}
                        <nav className="mb-10 mb-md-0">
                            <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                                <NavLink className="list-group-item list-group-item-action dropright-toggle " to={PATH.Profile.Order}>Theo dõi đơn hàng</NavLink>
                                <NavLink className="list-group-item list-group-item-action dropright-toggle " end to={PATH.Profile.index}>Thông tin cá nhân</NavLink>
                                <NavLink className="list-group-item list-group-item-action dropright-toggle " to={PATH.Profile.Wishlist}>Sản phẩm yêu thích</NavLink>
                                <NavLink className="list-group-item list-group-item-action dropright-toggle " to={PATH.Profile.Address}>Sổ địa chỉ</NavLink>
                                <NavLink className="list-group-item list-group-item-action dropright-toggle " to={PATH.Profile.Payment}>Sổ thanh toán</NavLink>
                                <a onClick={ev => {
                                    ev.preventDefault()
                                    dispatch(logoutAction())
                                }} className="list-group-item list-group-item-action dropright-toggle" href="#!">Đăng xuất</a>
                            </div>
                        </nav>
                    </div>
                    <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    )
}
