import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/products';

// Функция для получения всех продуктов с параметрами
export const fetchProducts = async (filters = {}) => {
    //console.log('filters:', filters);
    try {
        // Формируем параметры для URL с учётом фильтров и строки поиска
        const params = new URLSearchParams(filters).toString();
        //console.log('params:', new URLSearchParams(filters).toString());
        //console.log('params$:',` ${params}`);
        const response = await axios.get(`${BASE_URL}?${params}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
