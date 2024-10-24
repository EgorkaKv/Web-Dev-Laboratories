import React from 'react';

const PrimaryButton = ({ onClick, children }) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
};

export default PrimaryButton;
