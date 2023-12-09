import React, { useState } from 'react'
import { ShortedContentStyle } from './style'
import { cn } from '@/utils'
import { Button } from '../Button'

export const ShortedContent = ({ children, className, ...props }) => {
    const [isShorted, setIsShorted] = useState(true)

    return (
        <ShortedContentStyle className={className}>
            <div {...props} style={{ height: isShorted ? 300 : 'auto' }} className='content'>
                {children}
            </div>
            <div className="read-more pt-10">
                <Button outline onClick={() => setIsShorted(!isShorted)} className="min-w-[300px] btn-xs">{isShorted ? 'Mở rộng': 'Thu gọn' }</Button>
            </div>
        </ShortedContentStyle>
    )
}
