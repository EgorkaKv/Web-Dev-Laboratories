import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductCharacteristics from './ProductCharacteristics';
import ProductFields from './ProductFields';
import ProductPrice from './ProductPrice';
import ProductButtons from './ProductButtons';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
    const location = useLocation();
    const { product } = location.state || {};  // Получаем данные продукта из state

    if (!product) {
        return <div>No product data available</div>;
    }

    return (
        <div className="product-detail-page">
            <ProductImage image={product.image} title={product.title} />
            <div className="product-info">
                <ProductInfo title={product.title} description={product.description} />
                <ProductCharacteristics char1={product.color} char2={product.country} />
                <ProductFields /> {/* Случайные данные для ProductFields */}
                <ProductPrice price={product.price} />
                <ProductButtons />
            </div>
        </div>
    );
};

export default ProductDetailPage;
