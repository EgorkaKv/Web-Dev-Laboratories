import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import TotalAmount from './TotalAmount';
import { increaseQuantity, decreaseQuantity } from '../../redux/actions';
import './CartPage.css';
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cart || []); // Убедимся, что cart всегда массив
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/form');
    };

    const handleIncrease = (itemNumber) => {
        dispatch(increaseQuantity(itemNumber));
    };

    const handleDecrease = (itemNumber) => {
        dispatch(decreaseQuantity(itemNumber));
    };

    // Если cartItems пустой, totalAmount будет равен 0
    const totalAmount = cartItems.length > 0
        ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;

    return (
        <div className="cart-page">
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem
                            key={item.itemNumber}
                            item={item}
                            onIncrease={() => handleIncrease(item.itemNumber)}
                            onDecrease={() => handleDecrease(item.itemNumber)}
                        />
                    ))
                ) : (
                    <p>Ваша корзина пуста</p>
                )}
            </div>
            <TotalAmount total={totalAmount} />
            <div className="cart-buttons">
                <button className="back-button">Back to Catalog</button>
                <button className="continue-button" onClick={handleContinue}>Continue</button>
            </div>
        </div>
    );
};

export default CartPage;
