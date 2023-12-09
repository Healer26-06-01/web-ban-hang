import { PATH } from "@/config";
import { ProfileLayout } from "@/layouts/ProfileLayout";
import { Profile } from "@/pages/ca-nhan";
import { Order } from "@/pages/ca-nhan/don-hang";
import { OrderDetail } from "@/pages/ca-nhan/don-hang/[id]";
import { WishlistPage } from "@/pages/ca-nhan/san-pham-yeu-thich";
import { AddressPage } from "@/pages/ca-nhan/so-dia-chi";
import { ActionAddressPage } from "@/pages/ca-nhan/so-dia-chi/action";
import { PaymentPage } from "@/pages/ca-nhan/so-thanh-toan";
import { ActionPaymentPage } from "@/pages/ca-nhan/so-thanh-toan/action";

export const profile = [
    {
        element: <ProfileLayout />,
        children: [
            {
                element: <Profile />,
                index: true
            },
            {
                element: <WishlistPage />,
                path: PATH.Profile.Wishlist
            },
            {
                element: <AddressPage />,
                path: PATH.Profile.Address
            },
            {
                element: <ActionAddressPage />,
                path: PATH.Profile.NewAddress
            },
            {
                element: <ActionAddressPage />,
                path: PATH.Profile.EditAddress
            },

            {
                element: <PaymentPage />,
                path: PATH.Profile.Payment
            },
            {
                element: <ActionPaymentPage />,
                path: PATH.Profile.NewPayment
            },
            {
                element: <ActionPaymentPage />,
                path: PATH.Profile.EditPayment
            },


            {
                element: <Order />,
                path: PATH.Profile.Order
            },
            {
                element: <OrderDetail />,
                path: PATH.Profile.OrderDetail
            }
        ]
    }
]