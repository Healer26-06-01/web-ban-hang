import { cn } from '@/utils'
import { Popover } from 'antd'

export const Input = ({ type = 'text', helper, onChange, ...props }) => {
    return (
        <div className="form-group">
            <div className={cn("input-group input-group-merge border", { 'border border-sold text-[red] !border-[red]': props.error })}>
                <input className="form-control !border-0" onChange={ev => onChange(ev.target.value)} type={type} {...props} />
                {
                    helper && <Popover placement="topRight" content={helper} overlayStyle={{ maxWidth: 250 }}>
                        <i className="fe fe-help-circle flex items-center px-4" />
                    </Popover>
                }
            </div>
        </div>
    )
}
