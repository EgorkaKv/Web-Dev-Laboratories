import React from 'react';

const Tile = ({ image, altText, title, description }) => {
  return (
    <div className="tile">
      <img src={image} alt={altText} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Tile;
