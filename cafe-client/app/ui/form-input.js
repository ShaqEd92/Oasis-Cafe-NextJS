"use client";

const FormInput = ({ error, label, type, placeholder, name, value }) => {
    return (
        <div className="w-full mb-4">
            <label htmlFor={name}>
                {label}
            </label>
            <input
                id={name}
                autoComplete="false"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="text-contrast italic">{error}</div>
        </div>
    )
}

export default FormInput;