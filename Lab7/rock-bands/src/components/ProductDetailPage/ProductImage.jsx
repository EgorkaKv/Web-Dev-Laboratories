import React from 'react';

const ProductImage = ({ image, title }) => {
    return (
        <div className="product-image">
            <img src={image} alt={title} />
        </div>
    );
};

export default ProductImage;
