import React, { useState, useEffect } from 'react';
import Select from './Select';
import PrimaryButton from './PrimaryButton';
import ProductList from './ProductList';
import './CatalogPage.css';
import { useProducts } from '../../ProductContext';

const CatalogPage = () => {
    const { products } = useProducts();

    // Состояния для строки поиска и фильтров
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedColor, setSelectedColor] = useState('All Colors');
    const [selectedSize, setSelectedSize] = useState('All Sizes');
    const [selectedCountry, setSelectedCountry] = useState('All Countries');

    // Обработчик изменения строки поиска
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Применение поиска при каждом вводе буквы
    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const searchedProducts = products.filter(product =>
            product.title.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredProducts(searchedProducts);
    }, [searchTerm, products]);

    // Обработчики изменения фильтров
    const handleColorChange = (e) => setSelectedColor(e.target.value);
    const handleSizeChange = (e) => setSelectedSize(e.target.value);
    const handleCountryChange = (e) => setSelectedCountry(e.target.value);

    // Применение фильтров по нажатию на "Apply"
    const applyFilters = () => {
        let filtered = products;

        // Фильтрация по цвету
        if (selectedColor !== 'All Colors') {
            filtered = filtered.filter(product => product.color === selectedColor);
        }

        // Фильтрация по размеру
        if (selectedSize !== 'All Sizes') {
            filtered = filtered.filter(product => product.size === selectedSize);
        }

        // Фильтрация по стране
        if (selectedCountry !== 'All Countries') {
            filtered = filtered.filter(product => product.country === selectedCountry);
        }

        // Устанавливаем отфильтрованные продукты
        setFilteredProducts(filtered);
    };

    return (
        <div>
            {/* Строка поиска */}
            <section className="search-section">
                <input
                    type="text"
                    placeholder="Search by product title..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </section>

            {/* Секция фильтров */}
            <section className="filter-section">
                <Select options={['All Colors', 'black', 'blue']} value={selectedColor} onChange={handleColorChange} />
                <Select options={['All Sizes', 'S', 'L']} value={selectedSize} onChange={handleSizeChange} />
                <Select options={['All Countries', 'USA', 'England']} value={selectedCountry} onChange={handleCountryChange} />
                <PrimaryButton onClick={applyFilters}>Apply</PrimaryButton>
            </section>

            {/* Список продуктов: показываем отфильтрованные продукты */}
            <ProductList products={filteredProducts} />
        </div>
    );
};

export default CatalogPage;
