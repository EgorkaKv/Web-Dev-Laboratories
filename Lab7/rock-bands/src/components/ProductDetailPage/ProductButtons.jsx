import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, updateItemQuantity, increaseQuantity, decreaseQuantity } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const ProductButtons = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('S');

    const handleAddToCart = () => {
        const quantityNumber = parseInt(quantity, 10);
        if (quantityNumber <= product.max_quantity) {
            dispatch(addToCart({
                itemNumber: product.itemNumber,
                title: product.title,
                price: product.price,
                size,
                quantity: quantityNumber,
                max_quantity: product.max_quantity,
            }));
            navigate('/cart');
        } else {
            alert(`Максимально допустимое количество для этого товара: ${product.max_quantity}`);
        }
    };

    const handleIncrease = () => {
        if (quantity < product.max_quantity) {
            setQuantity(quantity + 1);
            dispatch(increaseQuantity(product.itemNumber));
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(decreaseQuantity(product.itemNumber));
        }
    };

    return (
        <div>
            <label>
                Размер:
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
            </label>
            <label>
                Количество:
                <input
                    type="number"
                    min="1"
                    max={product.max_quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </label>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handleIncrease}>Increase</button>
            <button onClick={handleDecrease}>Decrease</button>
        </div>
    );
};

export default ProductButtons;
