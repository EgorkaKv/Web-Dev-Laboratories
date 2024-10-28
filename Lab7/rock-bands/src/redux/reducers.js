import {
  ADD_TO_CART,
  LOAD_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  UPDATE_ITEM_QUANTITY
} from './types';

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_TO_CART:
      const existingItem = state.cart.find(
        (item) =>
          item.itemNumber === action.payload.itemNumber &&
          item.size === action.payload.size
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.itemNumber === action.payload.itemNumber &&
            item.size === action.payload.size
              ? {
                  ...item,
                  quantity:
                    item.quantity + action.payload.quantity <= item.max_quantity
                      ? item.quantity + action.payload.quantity
                      : item.max_quantity,
                }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.itemNumber === action.payload &&
          item.quantity < item.max_quantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.itemNumber === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.itemNumber === action.payload.itemNumber
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
