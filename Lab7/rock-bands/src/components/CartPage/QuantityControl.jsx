import React from 'react';

const QuantityControl = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <div className="quantity-control">
            <button onClick={onDecrease} className="quantity-button">-</button>
            <span className="quantity-display">{quantity}</span>
            <button onClick={onIncrease} className="quantity-button">+</button>
        </div>
    );
};

export default QuantityControl;
