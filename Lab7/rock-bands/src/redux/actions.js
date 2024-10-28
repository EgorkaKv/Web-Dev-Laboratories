import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const setCart = createAction('cart/setCart');

// Действие для добавления в корзину
export const addToCart = (product) => async (dispatch) => {
    try {
        // Убедитесь, что токен отправляется с заголовком `Authorization`
        await axios.post('http://localhost:5000/api/cart', product, {
            headers: { Authorization: `${localStorage.getItem('token')}` }
        });
        dispatch(fetchCart());
    } catch (error) {
        console.error("Ошибка при добавлении товара в корзину:", error);
    }
};

// Действие для получения корзины
export const fetchCart = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/cart', {
            headers: { Authorization: `${localStorage.getItem('token')}` }
        });
        dispatch(setCart(response.data));
    } catch (error) {
        console.error("Ошибка при загрузке корзины:", error);
    }
};
