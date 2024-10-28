import React from 'react';
import QuantityControl from './QuantityControl';

const CartItem = ({ item, onIncrease, onDecrease }) => {
    console.log("CartItem -> item", item);
    console.log("item image", item.image);
    return (
        <div className="cart-item">
            <div className="size">{item.size}</div>
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
