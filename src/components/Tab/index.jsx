import { cn } from "@/utils"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"

const Context = createContext({})

export const Tab = ({ name = 'tab', removeOnDeActive, children, defaultActive, onChange, onSearchChange }) => {
    const [search] = useSearchParams()
    const [active, _setActive] = useState(search.get(name) || defaultActive)

    const setActive = (value) => {
        _setActive(value)
        onChange?.(value)
    }

    return (
        <Context.Provider value={{ removeOnDeActive, active: search.get(name) || defaultActive, setActive, name, onSearchChange }}>{children}</Context.Provider>
    )
}


Tab.Title = ({ children, value }) => {
    const { pathname } = useLocation()
    const [search, setSearch] = useSearchParams()
    const { active, setActive, name, onSearchChange } = useContext(Context)

    const onClick = (ev) => {
        ev.preventDefault()
        setActive(value)
        setSearch((search) => {
            const _search = new URLSearchParams(search)
            _search.set(name, value)
            onSearchChange?.(_search)
            return _search
        }, { replace: true })
    }

    return <a onClick={onClick} className={cn("nav-link", { active: value === active })} href="#">{children}</a>
}

Tab.Content = ({ children, value }) => {
    const firstRender = useRef(false)
    const { active, removeOnDeActive } = useContext(Context)

    useEffect(() => {
        if (active === value) {
            firstRender.current = true
        }
    }, [active])

    if (removeOnDeActive && active !== value) {
        if (!firstRender.current) {
            return null
        }
    }

    return <div className={cn("tab-pane fade", { 'show active': active === value })}>{children}</div>
}