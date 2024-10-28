import {
  ADD_TO_CART,
  LOAD_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  UPDATE_ITEM_QUANTITY
} from './types';

// Экшоны для работы с корзиной
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const loadCart = (cartItems) => ({
  type: LOAD_CART,
  payload: cartItems,
});

export const increaseQuantity = (itemNumber) => ({
  type: INCREASE_QUANTITY,
  payload: itemNumber,
});

export const decreaseQuantity = (itemNumber) => ({
  type: DECREASE_QUANTITY,
  payload: itemNumber,
});

export const updateItemQuantity = (itemNumber, quantity) => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: { itemNumber, quantity },
});
