import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, addToCart } from '../../redux/actions';
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

    const handleIncrease = (item) => {
        const updatedProduct = { ...item, quantity: 1 }; // Увеличиваем количество на 1
        dispatch(addToCart(updatedProduct)); // Добавляем в корзину
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            const updatedProduct = { ...item, quantity: -1 }; // Уменьшаем количество на 1
            dispatch(addToCart(updatedProduct)); // Добавляем в корзину
        } else {
            // Если количество 1, можно удалить из корзины или игнорировать
            // dispatch(removeFromCart(item)); // Если у вас есть функция для удаления товара
        }
    };

    return (
        <div className="cart-page">
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.map(item => (
                    <CartItem
                        key={item.itemNumber}
                        item={item}
                        onIncrease={() => handleIncrease(item)}
                        onDecrease={() => handleDecrease(item)}
                    />
                ))}
            </div>
            <TotalAmount total={totalAmount} />
        </div>
    );
};

export default CartPage;
