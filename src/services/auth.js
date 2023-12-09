import { AUTHEN_API } from "@/config/api"
import { http } from "@/utils"

export const authService = {
    refreshToken(data) {
        return http.post(`${AUTHEN_API}/refresh-token`, data)
    },
    loginByCode(data) {
        return http.post(`${AUTHEN_API}/login-by-code`, data)
    },
    login(data) {
        return http.post(`${AUTHEN_API}/login-test`, data)
    }
}