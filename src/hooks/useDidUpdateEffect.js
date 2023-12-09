import { useEffect, useRef } from "react"

export const useDidUpdateEffect = (fn, dependencyList) => {
    const didMountRef = useRef(false)

    useEffect(() => {
        if(didMountRef.current) {
            return fn()
        }
        didMountRef.current = true
    }, dependencyList)
}