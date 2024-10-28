import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';

const ProductTile = ({ product }) => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate('/product-details', { state: { product } });  // Передаем объект product через state
    };
    //console.log(product.image)
    return (
        <div className="tile">
            <span className="item-number">{product.itemNumber}</span>
            <img src= {process.env.PUBLIC_URL + product.image} alt="Product Image" />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className="price">Price: <strong>{product.price}</strong></p>
            <p>Color: {product.color}</p>
            <p>Size: {product.size}</p>
            <p>Country: {product.country}</p>
            <PrimaryButton onClick={handleViewMore}>View more</PrimaryButton>
        </div>
    );
};

export default ProductTile;
