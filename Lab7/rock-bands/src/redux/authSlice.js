import { createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: !!localStorage.getItem('token'),
        user: null,
        error: null, // Добавлено состояние для ошибок
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            console.log('loginSuccess', action.payload.token);
            localStorage.setItem('token', action.payload.token);
        },
        loginFailure: (state, action) => {
            state.isAuthenticated = false;
            state.error = action.payload; // Устанавливаем сообщение об ошибке
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            localStorage.removeItem('token');
        },
    },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
    const response = await AuthService.login(credentials);
    if (response?.token) {
        dispatch(loginSuccess(response));
    } else {
        dispatch(loginFailure(response?.error || "Login failed. Please try again."));
    }
};

export const register = (credentials) => async (dispatch) => {
    const response = await AuthService.register(credentials);
    if (response?.token) {
        dispatch(loginSuccess(response));
    } else {
        dispatch(loginFailure(response?.error || "Registration failed. Please try again."));
    }
};


export const logout = () => (dispatch) => {
    dispatch(logoutSuccess());
};

export default authSlice.reducer;
