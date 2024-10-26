import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import TotalAmount from './TotalAmount';
import { increaseQuantity, decreaseQuantity } from '../../redux/actions';
import './CartPage.css';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cart); // Извлекаем корзину из стейта
    const dispatch = useDispatch();

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.map(item => (
                    <CartItem
                        key={item.itemNumber}  // Уникальный ключ для каждого товара
                        item={item}
                        onIncrease={() => handleIncrease(item.itemNumber)}
                        onDecrease={() => handleDecrease(item.itemNumber)}
                    />
                ))}
            </div>
            <TotalAmount total={totalAmount} />
            <div className="cart-buttons">
                <button className="back-button">Back to Catalog</button>
                <button className="continue-button">Continue</button>
            </div>
        </div>
    );
};

export default CartPage;
