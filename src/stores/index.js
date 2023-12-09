import { ENV } from '@/config'
import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSaga, getUserAction } from './auth'
import { cartReducer, cartSaga, getCartAction } from './cart'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

function* rootSaga() {
    yield all([
        cartSaga(),
        authSaga(),
    ])
}

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    },
    devTools: ENV === 'development',
    middleware: getMiddleware => getMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)


store.dispatch(getUserAction())
store.dispatch(getCartAction())