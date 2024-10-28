import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../redux/actions';
import CartItem from './CartItem';
import TotalAmount from './TotalAmount';
import './CartPage.css';
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.map(item => (
                    <CartItem key={item.itemNumber} item={item} />
                ))}
            </div>
            <TotalAmount total={totalAmount} />
        </div>
    );
};

export default CartPage;
