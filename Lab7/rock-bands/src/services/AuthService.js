import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const login = async (credentials) => {
    console.log('credentials_log', credentials);
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        console.log('log', response.data);
        return response.data;
    } catch (error) {
        console.log('error', error.response.data);
        console.error('Login failed:', error);
    }
};

const register = async (credentials) => {
    console.log('credentials_reg', credentials);
    try {
        const response = await axios.post(`${API_URL}/register`, credentials);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
    }
};

const AuthService = { login, register };
export default AuthService;
