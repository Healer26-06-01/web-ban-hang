import React, { useRef, useState } from 'react'

export const UploadFile = ({ children, onChange }) => {
    const [imagePreview, setImagePreview] = useState()
    const fileRef = useRef()

    const onPreview = () => {
        if (fileRef.current.files[0]) {
            const reader = new FileReader()
            onChange?.(fileRef.current.files[0])
            reader.addEventListener('load', () => {
                setImagePreview(reader.result)
            })

            reader.readAsDataURL(fileRef.current.files[0])
        }
    }

    const trigger = () => {
        fileRef.current.click()
    }

    return (
        <>
            <input accept="image/*" type="file" hidden ref={fileRef} onChange={onPreview} />
            {children(imagePreview, trigger)}
        </>
    )
}
