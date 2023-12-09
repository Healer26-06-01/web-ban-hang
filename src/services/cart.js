import { CART_API } from "@/config/api"
import { http } from "@/utils"

export const cartService = {
    addItem(productId, quantity) {
        return http.patch(`${CART_API}/${productId}`, { quantity })
    },
    getCart() {
        return http.get(`${CART_API}`)
    },
    removeItem(productId) {
        return http.delete(`${CART_API}/${productId}`)
    },
    preCheckout(data) {
        return http.post(`${CART_API}/pre-checkout`, data)
    },
    getPromotion(code) {
        return http.get(`${CART_API}/promotion/${code}`)
    },
    getShippingMethod() {
        return http.get(`${CART_API}/shipping-method`)
    },
    checkout(data) {
        return http.post(`${CART_API}/checkout`, data)
    }
}