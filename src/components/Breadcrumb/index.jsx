import React from "react"
import { Link } from "react-router-dom"

export const Breadcrumb = ({children}) => {
    return (
        <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
            {children}
        </ol>
    )
}


Breadcrumb.Item = ({to, children}) => {

    return (
        <li className="breadcrumb-item">
            {
                to ? <Link className="text-gray-400" to={to}>{children}</Link> : children
            }
        </li>
    )
}