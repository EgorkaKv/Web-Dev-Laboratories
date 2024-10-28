import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../images/success.jfif';
import './SuccessPage.css';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="success-page">
            <img className='success-image' src={image} alt="Success" />
        <h1>Success!</h1>
        <p>Your order was sent to processing</p>
        <button onClick={() => navigate('/catalog')} className="back-button">Back to Form</button>
        </div>
    );
};

export default SuccessPage;