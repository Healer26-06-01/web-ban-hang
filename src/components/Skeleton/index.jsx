import React from 'react'
import { SkeletonStyle } from './style'
import { cn } from '@/utils'

export const Skeleton = ({ shape, width, height, children, ...props }) => {
    return (
        <SkeletonStyle  {...props} className={cn(shape, props.className)} style={{ width, height }}>{children}</SkeletonStyle>
    )
}
