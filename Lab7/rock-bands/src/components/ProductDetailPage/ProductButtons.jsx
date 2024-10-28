import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const ProductButtons = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('S');

    const handleAddToCart = () => {
        console.log("old item number", product.itemNumber);
        const ItemNumber = product.itemNumber; // Присваиваем значение
        const lastNumb = ItemNumber.slice(-1); // Получаем последний символ
        let adjustedItemNumber; // Объявляем переменную вне условия

        if (size === 'S' && lastNumb > 4) {
            const lastChar = ItemNumber.slice(-1);
            const number = parseInt(lastChar); // Преобразуем в число
            const newNumber = (number + 4) % 10; // Убедимся, что результат в диапазоне от 0 до 9
            adjustedItemNumber = ItemNumber.slice(0, -1) + newNumber; // Присваиваем значение
        } else {
            adjustedItemNumber = product.itemNumber; // Присваиваем значение для другого случая
        }
        console.log("new item number", adjustedItemNumber);
        if (quantity > product.max_quantity) {
            alert(`Максимально дозволена кількість: ${product.max_quantity}`);
            return;
        }

        dispatch(addToCart({
            itemNumber: adjustedItemNumber,
            quantity,
            size,
            title: product.title,
            price: product.price
        }));

        navigate('/cart');
    };

    return (
        <div>
            <label>Размір:
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="S">S</option>
                    <option value="L">L</option>
                </select>
            </label>
            <label>Кількість:
                <input type="number" min="1" max={product.max_quantity} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </label>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductButtons;
