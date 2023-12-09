import { useSearchParams } from "react-router-dom"
import queryString from "query-string"

export const useSearch = (defaultValue) => {
    const [search, setSearch] = useSearchParams()
    const value = { ...defaultValue }
    for (let [key, val] of search.entries()) {
        try {
            value[key] = JSON.parse(val || defaultValue[key])
        } catch (err) {
            value[key] = val || defaultValue[key]
        }
    }
    const setValue = (valueObj, options) => {
        const qs = queryString.stringify({ ...value, ...valueObj })
        setSearch(qs, options)
    }

    return [value, setValue]
}