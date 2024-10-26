import React from 'react';

const ProductPrice = ({ price }) => {
    return (
        <div className="product-price">
            <h2>Price: ${price}</h2>
        </div>
    );
};

export default ProductPrice;
