import React from 'react';

export const Input = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    helperText = '',
    required = false,
    min,
    max,
    step
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={min}
                max={max}
                step={step}
                className="input-field"
            />
            {helperText && (
                <p className="mt-1 text-xs text-gray-500">{helperText}</p>
            )}
        </div>
    );
};
