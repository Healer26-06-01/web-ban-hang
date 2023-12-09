import { useCallback, useEffect } from "react"
import { useState } from "react"
import { validate } from "../utils/validate"

/**
 * 
 * @param {*} rules 
 * @return register, values, errors, validate
 */
export const useForm = (rules, { initialValue = {}, dependencies = {} } = {}) => {
    const [values, setValues] = useState(initialValue)
    const [errors, setError] = useState({})

    useEffect(() => {
        setValues(initialValue)
    }, [JSON.stringify(initialValue)])


    const register = (name) => {
        return {
            error: errors[name],
            value: values[name] || '',
            onChange: (value) => {
                let _values = { ...values, [name]: value }

                const _errorObj = {}

                if (rules[name]) {
                    _errorObj[name] = validate({
                        [name]: rules[name]
                    }, _values)[name]

                }
                if (dependencies[name]) {
                    for (let dependency of dependencies[name]) {
                        _errorObj[dependency] = validate({
                            [dependency]: rules[dependency]
                        }, _values)[dependency]
                    }
                }

                setError(prev => ({ ...prev, ..._errorObj }))
                setValues((prev) => ({ ...prev, [name]: value }))
            }
        }
    }

    const _validate = () => {
        const errorObject = validate(rules, values)

        setError(errorObject)

        return Object.keys(errorObject).length === 0
    }

    const reset = () => {
        setValues({})
    }

    return {
        values,
        setValues,
        errors,
        register,
        validate: _validate,
        reset
    }
}