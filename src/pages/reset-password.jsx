import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { PATH } from '@/config'
import { useBodyClass } from '@/hooks/useBodyClass'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { useSearch } from '@/hooks/useSearch'
import { userService } from '@/services/user'
import { getUserAction } from '@/stores/auth'
import { getCartAction } from '@/stores/cart'
import { confirm, handleError, required, setToken } from '@/utils'
import { message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const ResetPassword = () => {
    useBodyClass('bg-light')
    const [search] = useSearchParams()
    const code = search.get('code')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!code) {
            navigate(PATH.Account)
        }
    }, [])
    const form = useForm({
        password: [required()],
        confirmPassword: [required(), confirm('password')]
    })
    const { loading, refetch: changePasswordService } = useQuery({
        enabled: false,
        queryFn: () => userService.changePasswordByCode({
            password: form.values.password,
            code
        })
    })

    const onSubmit = async () => {
        try {
            const res = await changePasswordService()
            message.success("Thay đổi mật khẩu thành công")
            setToken(res.data)
            dispatch(getUserAction())
            dispatch(getCartAction())
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <section className="py-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        {/* Card */}
                        <div className="card card-lg mb-10 mb-md-0">
                            <div className="card-body">
                                {/* Heading */}
                                <h6 className="mb-7">Reset Password</h6>
                                {/* Form */}
                                <div className="row">
                                    <div className="col-12">
                                        <Field
                                            type="password"
                                            placeholder="Password *"
                                            {...form.register('password')}
                                        />
                                    </div>
                                    <div className="col-12">
                                        {/* Password */}
                                        <Field
                                            type="password"
                                            placeholder="Confirm Password *"
                                            {...form.register('confirmPassword')}
                                        />
                                    </div>
                                    <div className="col-12 col-md">
                                    </div>
                                    <div className="col-12">
                                        {/* Button */}
                                        <Button onClick={onSubmit} loading={loading}>
                                            Reset Password
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
