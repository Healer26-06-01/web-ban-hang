import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const element = document.createElement('div')

export const Portal = ({ children, selector }) => {
  const [, forceRender] = useState()
  useEffect(() => {
    forceRender(Math.random())
  }, [])
  return createPortal(children, document.querySelector(selector) || element)
}
