import { cn } from '@/utils'
import React from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

export const Paginate = ({ totalPage, name = 'page' }) => {
    const [search, setSearch] = useSearchParams()
    const currentPage = parseInt(search.get(name) || 1)
    const {pathname} = useLocation()

    const _search = new URLSearchParams(search)

    const renderItem = () => {
        const list = []
        let start = currentPage - 2
        let end = currentPage + 2

        if (start < 1) {
            start = 1
            end = start + 4
        }

        if (end > totalPage) {
            end = totalPage
            start = end - 4

            if (start < 1) start = 1
        }

        for (let i = start; i <= end; i++) {
            _search.set(name, i)

            list.push(<li key={i} className={cn("page-item", { active: i === currentPage })}>
                <Link className="page-link" to={`${pathname}?${_search.toString()}`}>{i}</Link>
            </li>)
        }
        return list
    }

    _search.set(name, currentPage - 1)
    const preLink = `${pathname}?${_search.toString()}`

    _search.set(name, currentPage + 1)
    const nextLink = `${pathname}?${_search.toString()}`

    if(totalPage <= 1) return null

    return (
        <nav className="d-flex justify-content-center justify-content-md-end">
            <ul className="pagination pagination-sm text-gray-400">
                {
                    currentPage > 1 && (
                        <li className="page-item">
                            <Link className="page-link page-link-arrow" to={preLink}>
                                <i className="fa fa-caret-left" />
                            </Link>
                        </li>
                    )
                }
                {renderItem()}
                {
                    currentPage < totalPage && (
                        <li className="page-item">
                            <Link className="page-link page-link-arrow" to={nextLink}>
                                <i className="fa fa-caret-right" />
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}
