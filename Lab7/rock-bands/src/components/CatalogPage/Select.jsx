import React from 'react';

const Select = ({ options, value, onChange, disabled = false }) => {
    return (
        <select value={value} onChange={onChange} disabled={disabled}>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;
