import { createReducer } from '@reduxjs/toolkit';
import { addToCart, increaseQuantity, decreaseQuantity } from './actions';

const initialState = {
    cart: []
};

const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addToCart, (state, action) => {
            const existingProductIndex = state.cart.findIndex(item => item.itemNumber === action.payload.itemNumber);
            console.log('findindex', existingProductIndex);
            console.log('input id', action.payload.itemNumber);

            if (existingProductIndex !== -1) {
                // Если товар уже есть в корзине, увеличиваем его количество
                console.log('уже в корзине',existingProductIndex);
                state.cart[existingProductIndex].quantity += 1;
            } else {
                // Если товара нет в корзине, добавляем его как новый объект
                console.log('нет в корзине',action.payload);
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            console.log('cart',state.cart);
        })
        .addCase(increaseQuantity, (state, action) => {
            const product = state.cart.find(item => item.itemNumber === action.payload);
            if (product) {
                product.quantity += 1;
            }
        })
        .addCase(decreaseQuantity, (state, action) => {
            const product = state.cart.find(item => item.itemNumber === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        });
});

export default cartReducer;
