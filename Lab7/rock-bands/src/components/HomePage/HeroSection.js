import React from 'react';
import headingImage from '../../images/heading.svg';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-image">
        <img src={headingImage} alt="Placeholder" />
      </div>
      <div className="hero-text">
        <h1>Clothes from Egor</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.</p>
      </div>
    </section>
  );
};

export default HeroSection;
