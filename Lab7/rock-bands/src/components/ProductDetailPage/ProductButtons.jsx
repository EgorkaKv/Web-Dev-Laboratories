// ProductButtons.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const ProductButtons = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        console.log('ProductButtons',product);
        dispatch(addToCart(product));
        navigate('/cart');
    };

    return (
        <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
    );
};

export default ProductButtons;
