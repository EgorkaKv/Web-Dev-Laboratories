// Экшен-тип для добавления товара
import { createAction } from '@reduxjs/toolkit';

export const addToCart = createAction('cart/addToCart');
export const increaseQuantity = createAction('cart/increaseQuantity');
export const decreaseQuantity = createAction('cart/decreaseQuantity');

