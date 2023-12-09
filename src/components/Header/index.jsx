import { PATH } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchDrawer } from '../SearchDrawer'
import { useAuth } from '@/hooks/useAuth'
import { avatarDefault } from '@/config/assets'
import { Dropdown, Popover } from 'antd'
import { useDispatch } from 'react-redux'
import { logoutAction } from '@/stores/auth'
import { useCart } from '@/hooks/useCart'
import { CartDrawer } from '../CartDrawer'
import { CheckCircleFilled } from '@ant-design/icons'
import { Button } from '../Button'
import { cartActions } from '@/stores/cart'
import { useTranslate } from '../TranslateProvider'

const LANG = {
    en: 'English',
    vi: 'Tiếng Việt',
    china: 'China'
}

export const Header = () => {
    const { user } = useAuth()
    const [openSearchDrawer, setOpenSerachDrawer] = useState(false)
    const [openCartDrawer, setOpenCartDrawer] = useState(false)
    const dispatch = useDispatch()
    const { cart, openCartOver } = useCart()
    const { t, setLang, lang } = useTranslate()
    return (
        <>
            <SearchDrawer open={openSearchDrawer} onClose={() => setOpenSerachDrawer(false)} />
            <CartDrawer open={openCartDrawer} onClose={() => setOpenCartDrawer(false)} />
            <div>
                {/* NAVBAR */}
                <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
                    <div className="container">
                        {/* Promo */}
                        <div className="mr-xl-8">
                            <i className="fe fe-truck mr-2" /> <span className="heading-xxxs">{t("Global shipping")}</span>
                        </div>
                        {/* Toggler */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topbarCollapse" aria-controls="topbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        {/* Collapse */}
                        <div className="navbar-collapse" id="topbarCollapse">
                            {/* Nav */}
                            <ul className="nav nav-divided navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    {/* Toggle */}
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
                                        <img className="mb-1 mr-1" src="/img/flags/usa.svg" alt="..." /> United States
                                    </a>
                                    {/* Menu */}
                                    <div className="dropdown-menu minw-0">
                                        <a className="dropdown-item" href="#!">
                                            <img className="mb-1 mr-2" src="/img/flags/usa.svg" alt="USA" />United States
                                        </a>
                                        <a className="dropdown-item" href="#!">
                                            <img className="mb-1 mr-2" src="/img/flags/canada.svg" alt="Canada" />Canada
                                        </a>
                                        <a className="dropdown-item" href="#!">
                                            <img className="mb-1 mr-2" src="/img/flags/germany.svg" alt="Germany" />Germany
                                        </a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    {/* Toggle */}
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">USD</a>
                                    {/* Menu */}
                                    <div className="dropdown-menu minw-0">
                                        <a className="dropdown-item" href="#!">USD</a>
                                        <a className="dropdown-item" href="#!">EUR</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    {/* Toggle */}
                                    <Dropdown menu={{
                                        items: [
                                            {
                                                key: 1,
                                                label: 'English',
                                                onClick: () => setLang('en')
                                            },
                                            {
                                                key: 2,
                                                onClick: () => setLang('vi'),
                                                label: 'Tiếng Việt',
                                            },
                                            {
                                                key: 3,
                                                onClick: () => setLang('china'),
                                                label: 'China',
                                            },

                                        ]
                                    }}>
                                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">{LANG[lang]}</a>
                                    </Dropdown>


                                </li>
                            </ul>
                            {/* Nav */}
                            <ul className="nav navbar-nav mr-8">
                                <li className="nav-item">
                                    <a className="nav-link" href="./shipping-and-returns.html">{t("Delivery rules")}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="./faq.html">{t('Question')}</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={PATH.Contact}>{t('Contact')}</Link>
                                </li>
                            </ul>
                            {/* Nav */}
                            <ul className="nav navbar-nav flex-row">
                                <li className="nav-item">
                                    <a className="nav-link text-gray-350" href="#!">
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                </li>
                                <li className="nav-item ml-xl-n4">
                                    <a className="nav-link text-gray-350" href="#!">
                                        <i className="fab fa-twitter" />
                                    </a>
                                </li>
                                <li className="nav-item ml-xl-n4">
                                    <a className="nav-link text-gray-350" href="#!">
                                        <i className="fab fa-instagram" />
                                    </a>
                                </li>
                                <li className="nav-item ml-xl-n4">
                                    <a className="nav-link text-gray-350" href="#!">
                                        <i className="fab fa-medium" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* NAVBAR */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        {/* Brand */}
                        <Link className="navbar-brand" to={PATH.Home}>
                            <img style={{ width: 50 }} src="/img/logo.svg" />
                            Shopper.
                        </Link>
                        {/* Toggler */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        {/* Collapse */}
                        <div className="navbar-collapse" id="navbarCollapse">
                            {/* Nav */}
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={PATH.Home}>{t('Home')}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={PATH.Product}>{t('Product')}</Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link className="nav-link" to="/dien-thoai-may-tinh-bang/1789">{t('Phone')}</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link" to="/laptop-thiet-bi-it/1846">{t('Laptop')}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/san-pham?page=1&sort=discount_rate.desc">{t('Promotion product')}</Link>
                                </li>
                            </ul>
                            {/* Nav */}
                            <ul className="navbar-nav flex-row">
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="modal" href="#modalSearch" onClick={(ev) => {
                                        ev.preventDefault()
                                        setOpenSerachDrawer(true)
                                    }}>
                                        <i className="fe fe-search" />
                                    </a>
                                </li>
                                <li className="nav-item ml-lg-n4">
                                    <a className="nav-link" href="./account-wishlist.html">
                                        <i className="fe fe-heart" />
                                    </a>
                                </li>
                                <li className="nav-item ml-lg-n4">
                                    <Popover onOpenChange={visible => {
                                        if (!visible) {
                                            dispatch(cartActions.togglePopover(false))
                                        }
                                    }} trigger={['click']} open={openCartOver} placement="bottomRight" content={<>
                                        <p className="mb-0 flex gap-2 items-center"><span className="text-green-500"><CheckCircleFilled /></span> {t('Product added to cart successfully')}</p>
                                        <Link onClick={() => dispatch(cartActions.togglePopover(false))} to={PATH.ViewCart} className="btn btn-dark btn-sm flex items-center justify-center gap-2 w-full btn-xs mt-2">
                                            {t('View cart and checkout')}
                                        </Link>
                                    </>}>
                                        <a onClick={ev => {
                                            ev.preventDefault()
                                            setOpenCartDrawer(true)
                                        }} className="nav-link" href="#">
                                            <span data-cart-items={cart?.totalQuantity || undefined}>
                                                <i className="fe fe-shopping-cart" />
                                            </span>
                                        </a>
                                    </Popover>
                                </li>
                                {
                                    user ? (
                                        <Dropdown arrow placement="bottomRight" menu={{
                                            items: [
                                                {
                                                    key: 1,
                                                    label: <Link to={PATH.Profile.Order}>{t('My order')}</Link>
                                                },
                                                {
                                                    key: 2,
                                                    label: <Link to={PATH.Profile.index}>{t('Personal information')}</Link>
                                                },
                                                {
                                                    key: 3,
                                                    label: t('Logout'),
                                                    onClick: () => {
                                                        dispatch(logoutAction())
                                                    }
                                                },

                                            ]
                                        }}>
                                            <li className="nav-item ml-lg-n4">
                                                <Link className="header-avatar nav-link" to={PATH.Profile.index}>
                                                    <img src={user?.avatar || avatarDefault} />
                                                </Link>
                                            </li>
                                        </Dropdown>
                                    ) : (
                                        <li className="nav-item ml-lg-n4">
                                            <Link className="nav-link" to={PATH.Account}>
                                                <i className="fe fe-user" />
                                            </Link>
                                        </li>

                                    )
                                }


                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}
