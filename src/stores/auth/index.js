import { getUser } from "@/utils/token"
import { createAction, createSlice } from '@reduxjs/toolkit'
import { takeLatest } from "redux-saga/effects"
import { fetchLogin, fetchLoginByCode, fetchUser, logout, setUserSaga } from "./saga"

const initialState = {
    user: getUser(),
    status: 'idle',
    loginLoading: false
}


export const { reducer: authReducer, actions: authActions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        logout: (state) => {
            state.user = null
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        toggleLoading: (state, action) => {
            state.loginLoading = action.payload
        }
    },
})


export const loginAction = createAction(`${name}/login`)
export const logoutAction = createAction(`${name}/actionLogout`)
export const setUserAction = createAction(`${name}/setUserAction`)
export const loginByCodeAction = createAction(`${name}/loginByCode`)
export const getUserAction = createAction(`${name}/getUser`)
export const loginSuccessAction = createAction(`${name}/loginSuccess`)


export function* authSaga() {
    yield takeLatest(loginAction, fetchLogin)
    yield takeLatest(logoutAction, logout)
    yield takeLatest(getUserAction, fetchUser)
    yield takeLatest(setUserAction, setUserSaga)
    yield takeLatest(loginByCodeAction, fetchLoginByCode)
}