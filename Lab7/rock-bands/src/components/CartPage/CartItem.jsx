import React from 'react';
import QuantityControl from './QuantityControl';

const CartItem = ({ item, onIncrease, onDecrease }) => {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h2 className="cart-item-title">{item.title}</h2>
                <QuantityControl
                    quantity={item.quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />
                <p className="cart-item-price">${item.price * item.quantity}</p>
            </div>
        </div>
    );
};

export default CartItem;
