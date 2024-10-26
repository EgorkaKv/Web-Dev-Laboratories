import React from 'react';

const ProductFields = () => {
    // Генерируем случайные данные для отображения полей
    const options = [
        { name: 'Material', value: 'Cotton' },
        { name: 'Weight', value: '1.2kg' },
        { name: 'Dimensions', value: '30x40cm' },
    ];

    return (
        <div className="product-fields">
            <h3>Product Specifications:</h3>
            <ul>
                {options.map((option, index) => (
                    <li key={index}>
                        {option.name}: {option.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductFields;
