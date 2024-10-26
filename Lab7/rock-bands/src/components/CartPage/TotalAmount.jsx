import React from 'react';

const TotalAmount = ({ total }) => {
    return (
        <div className="total-amount">
            <p>Total amount:</p>
            <strong>${total}</strong>
        </div>
    );
};

export default TotalAmount;
