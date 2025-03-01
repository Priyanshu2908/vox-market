
import React from 'react'

const TextInput = ({ id, label, value = "", placeholder = "", inputType = "text", disabled = false, readOnly = false }) => {
    return (
        <div>
            <label className='mb-2 font-bold' htmlFor={id}>{label}</label>
            <input
                id={id}
                className='w-full p-2 border-2 rounded-md'
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                value={value}
            />
        </div>
    )
}

export default TextInput