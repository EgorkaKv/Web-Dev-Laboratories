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
        let adjustedItemNumber; // Объявляем переменную вне условия

        if (size === 'L') {
            const lastChar = ItemNumber.slice(-1);
            const number = parseInt(lastChar); // Преобразуем в число
            const newNumber = (number + 4) % 10; // Убедимся, что результат в диапазоне от 0 до 9
            adjustedItemNumber = ItemNumber.slice(0, -1) + newNumber; // Присваиваем значение
        } else {
            adjustedItemNumber = product.itemNumber; // Присваиваем значение для другого случая
        }
        console.log("new item number", adjustedItemNumber);
        if (quantity > product.max_quantity) {
            alert(`Максимально разрешенное количество: ${product.max_quantity}`);
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
            <label>Размер:
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                </select>
            </label>
            <label>Количество:
                <input type="number" min="1" max={product.max_quantity} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </label>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductButtons;
