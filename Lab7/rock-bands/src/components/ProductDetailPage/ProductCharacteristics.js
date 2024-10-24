import React from 'react';

const ProductCharacteristics = ({char1, char2}) => {
    return (
        <div className="product-characteristics">
            <button className="characteristic-btn">{char1}</button>
            <button className="characteristic-btn selected">{char2}</button>
        </div>
    );
};

export default ProductCharacteristics;
