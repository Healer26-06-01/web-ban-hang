import { storeCart, storePreCheckoutData, storePreCheckoutResponse } from "@/utils";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { takeLatest } from 'redux-saga/effects';
import { loginSuccessAction, logoutAction } from "../auth";
import { clearCart, fetchAddPromotion, fetchCart, fetchCartItem, fetchPreCheckout, fetchRemoveItem, fetchSelectCartItem, removePromotion, setCartSaga, updatePreCheckoutData } from "./saga";




export const { reducer: cartReducer, actions: cartActions, name, getInitialState } = createSlice({
    name: 'cart',
    initialState: () => {
        return {
            cart: storeCart.get(),
            openCartOver: false,
            preCheckoutData: storePreCheckoutData.get() || {
                promotionCode: [],
                listItems: [],
                shippingMethod: 'mien-phi'
            },
            preCheckoutResponse: storePreCheckoutResponse.get() || {},
            preCheckoutLoading: false,
            promotionLoading: false,
            loading: {
                // 234234: true
            }
        }
    },
    reducers: {
        clearCart(state) {
            return {
                ...state,
                openCartOver: false,
                preCheckoutData: {
                    promotionCode: [],
                    listItems: [],
                    shippingMethod: 'mien-phi'
                },
                preCheckoutResponse: {},
                preCheckoutLoading: false,
                promotionLoading: false,
                loading: {
                }
            }
        },
        setCart(state, action) {
            state.cart = action.payload
        },
        togglePopover(state, action) {
            state.openCartOver = action.payload
        },
        toggleProductLoading(state, action) {
            state.loading[action.payload.productId] = action.payload.loading
        },
        togglePreCheckoutLoading(state, action) {
            state.preCheckoutLoading = action.payload
        },
        togglePromotionLoading(state, action) {
            state.promotionLoading = action.payload
        },
        togglePromotionCode(state, action) {
            if (action.payload) {
                state.preCheckoutData.promotionCode = [action.payload]
            } else {
                state.preCheckoutData.promotionCode = []
            }
        },
        changeShippingMethod(state, action) {
            state.preCheckoutData.shippingMethod = action.payload
        },
        setPreCheckoutData(state, action) {
            state.preCheckoutData = action.payload
        },
        setPreCheckoutResponse(state, action) {
            state.preCheckoutResponse = action.payload
        }
    }
})

export const updateCartItemAction = createAction(`${name}/addCartItem`)
export const removeCartItemAction = createAction(`${name}/removeItem`)
export const getCartAction = createAction(`${name}/getCart`)
export const toggleCheckoutItemAction = createAction(`${name}/selectCartItem`)
export const updateItemQuantitySuccessAction = createAction(`${name}/updateItemQuantitySuccess`)
export const addPromotionAction = createAction(`${name}/addPromotion`)
export const removePromotionAction = createAction(`${name}/removePromotion`)


export function* cartSaga() {
    console.log('cartSaga')
    // yield takeLatest('cart/getCart/pending', getCart)
    yield takeLatest(updateCartItemAction, fetchCartItem)
    yield takeLatest(removeCartItemAction, fetchRemoveItem)
    yield takeLatest([getCartAction, loginSuccessAction, cartActions.clearCart], fetchCart)
    yield takeLatest([logoutAction, cartActions.clearCart], clearCart)
    yield takeLatest(cartActions.setCart, setCartSaga)
    yield takeLatest(toggleCheckoutItemAction, fetchSelectCartItem)
    yield takeLatest([cartActions.setPreCheckoutData, updateItemQuantitySuccessAction, cartActions.togglePromotionCode, cartActions.changeShippingMethod], fetchPreCheckout)

    // Promotion
    yield takeLatest(addPromotionAction, fetchAddPromotion)
    yield takeLatest(removePromotionAction, removePromotion)


    yield takeLatest(removeCartItemAction, updatePreCheckoutData)
}
