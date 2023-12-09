import { message } from "antd"
import { t } from '@/components/TranslateProvider'

export const handleError = (err, key) => {
    console.error(err)
    if (err.response?.data?.message || err?.message) {

        let content = err?.response?.data?.message || err?.message
        message.error({
            content: t?.(content) || content,
            key
        })
    }
}