import { useState } from "react"
import { useRef } from "react"

export const useDebounce = (defaultValue, timing = 300) => {
    const timerRef = useRef()
    const [value, _setValue] = useState(defaultValue)

    const setValue = (value) => {
        if(timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            _setValue(value)
        }, timing)
    }

    return [value, setValue]
}