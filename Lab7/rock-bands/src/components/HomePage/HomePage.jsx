import React from 'react';
import HeroSection from "./HeroSection";
import TileSection from "./TileSection";
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <TileSection />
        </div>
    );
}

export default HomePage;
