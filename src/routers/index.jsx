import { PrivateRoute } from "@/components/PrivateRoute";
import { PATH } from "@/config";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages";
import { Page404 } from "@/pages/404";
import { ProductDetailPage } from "@/pages/[slug]";
import { ProductPage } from "@/pages/san-pham";
import { profile } from "./ca-nhan";
import { GuestRoute } from "@/components/GuestRoute";
import { Account } from "@/pages/tai-khoan";
import { ViewCart } from "@/pages/gio-hang";
import { Checkout } from "@/pages/checkout";
import { OrderComplete } from "@/pages/dat-hang-thanh-cong";
import { ResetPassword } from "@/pages/reset-password";
import { Contact } from "@/pages/contact";

export const routes = [
    {
        element: <MainLayout />,
        children: [
            {
                element: <HomePage />,
                path: '/'
            },
            {
                element: <ProductPage />,
                path: PATH.Product
            },
            {
                element: <ProductPage />,
                path: PATH.Category
            },
            {
                element: <ProductDetailPage />,
                path: PATH.ProductDetail
            },
            {
                element: <ViewCart />,
                path: PATH.ViewCart
            },
            {
                element: <Checkout />,
                path: PATH.Checkout
            },
            {
                element: <OrderComplete />,
                path: PATH.OrderComplete,
            },
            {
                element: <Contact />,
                path: PATH.Contact,
            },
            {
                element: <PrivateRoute redirect={PATH.Account}/>,
                children: profile,
                path: PATH.Profile.index
            },
            {
                element: <GuestRoute redirect={PATH.Profile.index}/>,
                children: [
                    {
                        path: PATH.Account,
                        element: <Account />
                    },
                    {
                        path: PATH.ResetPassword,
                        element: <ResetPassword />
                    }
                ]
            },
            {
                element: <Page404 />,
                path: '*'
            }
        ]
    },

]