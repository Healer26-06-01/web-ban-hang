import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { ResetPasswordModal } from '@/components/ResetPasswordModal'
import { useTranslate } from '@/components/TranslateProvider'
import { AUTH_MESSAGE } from '@/config/message'
import { useAuth } from '@/hooks/useAuth'
import { useBodyClass } from '@/hooks/useBodyClass'
import { useForm } from '@/hooks/useForm'
import { useQuery } from '@/hooks/useQuery'
import { useSearch } from '@/hooks/useSearch'
import { authService } from '@/services/auth'
import { userService } from '@/services/user'
import { loginAction, loginByCodeAction } from '@/stores/auth'
import { regexp, required, confirm, handleError, copyToClipboard } from '@/utils'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'

export const Account = () => {
    useBodyClass('bg-light')
    const [openResetPassword, setOpenResetPassword] = useState(false)
    const [search] = useSearch()
    const dispatch = useDispatch()
    const { loginLoading } = useAuth()
    const { loading, refetch: registerService } = useQuery({
        enabled: false,
        queryFn: () => userService.register({
            ...formRegister.values,
            redirect: window.location.origin + window.location.pathname
        }),
        limitDuration: 1000
    })

    useEffect(() => {
        if (search.code) {
            dispatch(loginByCodeAction(search.code))
        }
    }, [])
    const { t } = useTranslate()

    // const { loading: loginLoading, refetch: loginService } = useQuery({
    //     enabled: false,
    //     queryFn: () => authService.login(formLogin.values),
    //     limitDuration: 1000
    // })



    const formLogin = useForm({
        username: [
            required(),
            regexp('email')
        ],
        password: [
            required(),
        ]
    })

    const formRegister = useForm({
        name: [
            required()
        ],
        username: [
            required(),
            regexp('email')
        ],
        password: [
            required()
        ],
        confirmPassword: [
            confirm('password')
        ]
    }, {
        dependencies: {
            password: ['confirmPassword']
        }
    })

    const onRegister = async () => {
        if (formRegister.validate()) {
            try {
                const res = await registerService()
                message.success(res.message)
            } catch (err) {
                handleError(err)
            }
        }
    }

    const onLogin = async () => {
        if (formLogin.validate()) {
            try {
                dispatch(loginAction({
                    data: formLogin.values,
                    onError: handleError,
                    onSuccess: () => message.success(t(AUTH_MESSAGE.LOGIN_SUCCESS))
                }))
                // message.success(t('Login success'))
            } catch (err) {
                handleError(err)
            }
        }
    }

    const _copyToClipboard = (ev) => {
        copyToClipboard(ev.target.innerText)
        message.info('Copy to clipboard')
    }

    return (
        <>
            <Helmet>
                <title>Tài khoản</title>
            </Helmet>
            <ResetPasswordModal open={openResetPassword} onClose={() => setOpenResetPassword(false)} />
            <section className="py-12">

                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            {/* Card */}
                            <div className="card card-lg mb-10 mb-md-0">
                                <div className="card-body">
                                    {/* Heading */}
                                    <h6 className="mb-7">Returning Customer</h6>
                                    {/* Form */}
                                    <div>
                                        <div className="row">
                                            <div className="col-12">
                                                {/* Email */}
                                                <Field
                                                    placeholder="Email Address *"
                                                    {...formLogin.register('username')}
                                                />
                                            </div>
                                            <div className="col-12">
                                                {/* Password */}
                                                <Field
                                                    placeholder="Password *"
                                                    type="password"
                                                    {...formLogin.register('password')}
                                                />
                                            </div>
                                            <div className="col-12 col-md">
                                                {/* Remember */}
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input className="custom-control-input" id="loginRemember" type="checkbox" />
                                                        <label className="custom-control-label" htmlFor="loginRemember">
                                                            Remember me
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-auto">
                                                {/* Link */}
                                                <div className="form-group">
                                                    <a onClick={(ev) => {
                                                        ev.preventDefault()
                                                        setOpenResetPassword(true)
                                                    }} className="font-size-sm text-reset" href="#">Forgot
                                                        Password?</a>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                {/* Button */}
                                                <Button onClick={onLogin} loading={loginLoading}>
                                                    Sign In
                                                </Button>
                                            </div>
                                            <div className="col-12">
                                                <p className="font-size-sm text-muted mt-5 mb-2 font-light">Tài khoản demo: <b className="text-black"><span className="cursor-pointer underline" onClick={_copyToClipboard}>demo@spacedev.com</span> / <span className="cursor-pointer underline" onClick={_copyToClipboard}>Spacedev@123</span></b></p>
                                                <p className="font-size-sm text-muted mt-5 mb-2 font-light text-justify">
                                                    Chúng tôi cung cấp cho bạn tài khoản demo vì mục đích học tập, để đảm bảo những người khác có thể sử dụng chung tài khoản chúng tôi sẽ
                                                    hạn chế rất nhiều quyền trên tài khoản này ví dụ:  <br />
                                                    - Không thay đổi thông tin cá nhân, mật khẩu <br />
                                                    - không reset password,... <br /><br />
                                                    Để có thể sử dụng toàn bộ chức năng trên website, vui lòng tiến hành <b className="text-black">đăng ký</b> bằng tài khoản email có thật
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            {/* Card */}
                            <div className="card card-lg">
                                <div className="card-body">
                                    {/* Heading */}
                                    <h6 className="mb-7">New Customer</h6>
                                    {/* Form */}
                                    <div>
                                        <div className="row">
                                            <div className="col-12">
                                                <Field
                                                    placeholder="Full Name *"
                                                    {...formRegister.register('name')}
                                                />
                                            </div>
                                            <div className="col-12">
                                                {/* Email */}
                                                <Field
                                                    placeholder="Email Address *"
                                                    {...formRegister.register('username')}

                                                />

                                            </div>
                                            <div className="col-12 col-md-6">
                                                {/* Password */}
                                                <Field
                                                    placeholder="Password *"
                                                    type="password"
                                                    {...formRegister.register('password')}

                                                />

                                            </div>
                                            <div className="col-12 col-md-6">
                                                {/* Password */}
                                                <Field
                                                    placeholder="Confirm Password *"
                                                    type="password"
                                                    {...formRegister.register('confirmPassword')}
                                                />
                                            </div>
                                            <div className="col-12 col-md-auto">
                                                {/* Link */}
                                                <div className="form-group font-size-sm text-muted font-light">
                                                    By registering your details, you agree with our Terms &amp; Conditions,
                                                    and Privacy and Cookie Policy.
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                {/* Button */}
                                                <Button loading={loading} onClick={onRegister}>Register</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
