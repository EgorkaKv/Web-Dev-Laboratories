import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCart } from './actions';

const initialState = {
    cart: []
};

// Асинхронное действие для добавления товара в корзину
export const addToCart = createAsyncThunk('cart/addToCart', async (product, { dispatch, rejectWithValue }) => {
    try {
        await axios.post('http://localhost:5000/api/cart', product, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        dispatch(fetchCart()); // После добавления товара обновляем корзину
    } catch (error) {
        console.error("Ошибка при добавлении товара в корзину:", error);
        return rejectWithValue(error.response.data);
    }
});

// Асинхронное действие для получения корзины из базы данных
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/cart', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при загрузке корзины:", error);
        return rejectWithValue(error.response.data);
    }
});

// Редьюсер
const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setCart, (state, action) => {
            state.cart = action.payload;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.cart = action.payload;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            const { itemNumber, quantity, size } = action.meta.arg; // Получаем данные из аргументов вызова
            const existingProductIndex = state.cart.findIndex(
                item => item.itemNumber === itemNumber && item.size === size
            );

            if (existingProductIndex !== -1) {
                state.cart[existingProductIndex].quantity += quantity; // Увеличиваем или уменьшаем количество
                if (state.cart[existingProductIndex].quantity <= 0) {
                    // Если количество 0 или меньше, удаляем товар
                    state.cart.splice(existingProductIndex, 1);
                }
            } else {
                state.cart.push({ ...action.meta.arg, quantity });
            }
        });
});


export default cartReducer;
