import React from 'react';

const ProductInfo = ({ title, description }) => {
    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
};

export default ProductInfo;
