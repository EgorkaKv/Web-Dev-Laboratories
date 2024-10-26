import React from 'react';

const Select = ({ name, options, value, onChange, disabled = false }) => {
    return (
        <select name={name} value={value} onChange={onChange} disabled={disabled}>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;
