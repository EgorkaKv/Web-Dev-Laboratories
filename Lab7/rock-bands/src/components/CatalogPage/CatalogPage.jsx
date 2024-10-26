import React, { useState, useEffect } from 'react';
import Select from './Select';
import PrimaryButton from './PrimaryButton';
import ProductList from './ProductList';
import Loader from './Loader';
import { fetchProducts } from '../../api';
import './CatalogPage.css';

const CatalogPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        color: '',
        size: '',
        country: '',
    });
    const [appliedFilters, setAppliedFilters] = useState({
        color: '',
        size: '',
        country: '',
    });
    const [appliedSearchTerm, setAppliedSearchTerm] = useState('');

    // Функция для загрузки продуктов
    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const data = await fetchProducts({ ...appliedFilters, search: appliedSearchTerm });
             console.log(data)
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setTimeout(() => setIsLoading(false), 1000); // Длительная загрузка (2 сек)
        }
    };

    // Загрузка данных при первом рендере и изменении фильтров или строки поиска
    useEffect(() => {
        loadProducts();
    }, [appliedFilters, appliedSearchTerm]);

    // Обработчики для фильтров
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Обработчик строки поиска
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Обработчик кнопки "Apply"
    const handleApplyFilters = () => {
        setAppliedFilters(filters);
        setAppliedSearchTerm(searchTerm);
    };

    return (
        <div>
            <section className="search-section">
                <input
                    type="text"
                    placeholder="Search by product title..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </section>

            <section className="filter-section">
                <Select name="color" options={['All Colors', 'black', 'blue']} value={filters.color} onChange={handleFilterChange} />
                <Select name="size" options={['All Sizes', 'S', 'L']} value={filters.size} onChange={handleFilterChange} />
                <Select name="country" options={['All Countries', 'USA', 'England']} value={filters.country} onChange={handleFilterChange} />
                <PrimaryButton onClick={handleApplyFilters}>Apply</PrimaryButton>
            </section>

            {isLoading ? (
                <Loader />
            ) : (
                <ProductList products={products} />
            )}
        </div>
    );
};

export default CatalogPage;
