import { authService } from "@/services/auth"
import axios from "axios"
import { getToken, setToken } from "./token"

export const COURSE_API = import.meta.env.VITE_COURSE_API
export const ORGANIZATION_API = import.meta.env.VITE_ORGANIZATION_API
export const USER_API = import.meta.env.VITE_USER_API
export const AUTHENTICATION_API = import.meta.env.VITE_AUTHENTICATION_API

let refreshTokenPromise = null

export const http = axios.create()
http.interceptors.response.use((res) => {
    return res.data
}, async (error) => {

    try {
        if (error.response.status === 403 && error.response.data.error_code === "TOKEN_EXPIRED") {
            if (refreshTokenPromise) {
                await refreshTokenPromise
            } else {
                // refresh token
                console.log('refreshToken')
                const token = getToken()
                refreshTokenPromise = authService.refreshToken({
                    refreshToken: token.refreshToken
                })

                const res = await refreshTokenPromise

                setToken(res.data)

                refreshTokenPromise = null
                // gắn token vào localStorage

                // Thực thi lại api bị lỗi
            }

            return http(error.config)

        }
    } catch (err) {

    }
    throw error
})


http.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers['Authorization'] = `Bearer ${token.accessToken}`
    }
    return config
})