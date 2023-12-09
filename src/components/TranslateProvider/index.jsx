import { createContext, useContext, useEffect, useState } from "react"

const Context = createContext({})

export const t = (key) => {
    return _gloabl?.t?.(key)
}


const _gloabl = {}

export const TranslateProvider = ({ children, translate, defaultLang = 'en' }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('lang') || defaultLang
    })

    const _t = (key) => {
        return translate?.[lang]?.[key] || key
    }
    useEffect(() => {
        _gloabl.t = _t
    }, [_t])

    useEffect(() => {
        localStorage.setItem('lang', lang)
    }, [lang])


    return (
        <Context.Provider value={{ t: _t, setLang, lang }}>{children}</Context.Provider>
    )
}


export const useTranslate = () => useContext(Context)