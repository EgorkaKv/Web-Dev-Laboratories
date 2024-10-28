import React from 'react';

const ErrorMessage = ({ errors, touched }) => {
  const errorMessages = Object.keys(errors).reduce((acc, field) => {
    if (touched[field] && errors[field]) {
      acc.push(errors[field]);
    }
    return acc;
  }, []);

  return errorMessages.length > 0 ? (
    <div className="error-box">
      <h4>Oh snap! Change a few things up and try submitting again.</h4>
      <ul>
        {errorMessages.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default ErrorMessage;
