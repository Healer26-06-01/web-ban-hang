
import { cn } from '@/utils'
import { LoadingOutlined } from '@ant-design/icons'

export const Button = ({ outline, primary, children, loading, ...props }) => {
    return (
        <button {...props} className={cn("btn btn-sm flex items-center justify-center gap-2", props.className, {
            'disabled pointer-events-none': loading,
            'btn-dark': !outline,
            'btn-outline-dark': outline
        })} >
            {loading && <LoadingOutlined />}
            {children}
        </button>
    )
}
