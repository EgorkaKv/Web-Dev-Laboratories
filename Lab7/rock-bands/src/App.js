import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage/HomePage';
import CatalogPage from './components/CatalogPage/CatalogPage';
import Footer from './components/Footer';
import {ProductProvider} from './ProductContext';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import './styles/App.css';

function App() {
    return (
        <ProductProvider>
            <Router>
                <div className="App">
                    {/* Навигация остается неизменной */}
                    <Header/>
                    {/* Основной контент меняется в зависимости от маршрута */}
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/catalog" element={<CatalogPage/>}/>
                            <Route path="/product-details" element={<ProductDetailPage />} />
                        </Routes>
                    </main>
                    {/* Подвал остается неизменным */}
                    <Footer/>
                </div>
            </Router>
        </ProductProvider>
    );
}

export default App;
