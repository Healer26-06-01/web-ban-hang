import { ORGANIZATION_API, http } from "@/utils"

export const onganizationService = {
    contact(data) {
        return http.post(`${ORGANIZATION_API}/contact`, data)
    }
}