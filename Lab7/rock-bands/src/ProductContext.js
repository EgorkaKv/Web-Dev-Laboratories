import React, { createContext, useContext, useState } from 'react';


// Создаем контекст
const ProductContext = createContext();

// Хук для использования контекста продуктов
export const useProducts = () => {

    return useContext(ProductContext);
};

// Провайдер, который будет предоставлять данные о продуктах
export const ProductProvider = ({ children }) => {
    // Состояние с информацией о карточках продуктов
    const [products] = useState(
        [
{
            itemNumber: 'Item 1',
            title: 'Amazing Black Jacket',
            description: 'Stylish and comfortable jacket',
            price: '$100',
            color: 'red',
            size: 'M',
            country: 'Canada',
            image: 'placeholder1.png'
        },
        {
            itemNumber: 'Item 2',
            title: 'Blue T-shirt',
            description: 'Comfortable cotton T-shirt',
            price: '$50',
            color: 'blue',
            size: 'S',
            country: 'England',
            image: 'placeholder2.png'
        },
        {
            itemNumber: 'Item 3',
            title: 'Black Sneakers',
            description: 'Trendy black sneakers',
            price: '$75',
            color: 'black',
            size: 'S',
            country: 'USA',
            image: 'placeholder3.png'
        },
        {
            itemNumber: 'Item 4',
            title: 'Blue Jeans',
            description: 'Comfortable denim jeans',
            price: '$60',
            color: 'blue',
            size: 'L',
            country: 'England',
            image: 'placeholder4.png'
        }
        ]
    );

    // Возвращаем провайдер с доступом к состоянию продуктов
    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
};
