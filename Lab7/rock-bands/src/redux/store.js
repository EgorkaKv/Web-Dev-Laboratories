import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authSlice
    }
});

export default store;
