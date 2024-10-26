import React from 'react';

const ViewMoreButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="view-more">
      View more
    </button>
  );
};

export default ViewMoreButton;
