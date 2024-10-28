import React from 'react';
import ProductTile from './ProductTile';
import { useProducts } from '../../ProductContext'; // Импортируем хук контекста

const ProductList = ({products}) => {
     // Получаем данные продуктов из контекста
//console.log(products);
    return (
        <section className="tiles-section">
            {products.map((product, index) => (
                <ProductTile key={index} product={product} />
                // <>{console.log(product)}</>
            ))}
        </section>
    );
};

export default ProductList;
