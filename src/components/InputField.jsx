import React from "react";

function InputField({name, type, placeholder, value, changeHandler, children}) {
    return (
        <label htmlFor={name}>
            {children}
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={changeHandler}
            />
        </label>
    );
}

export default InputField;