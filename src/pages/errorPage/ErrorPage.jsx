import React, { memo } from 'react';
import './ErrorPage.css';

const ErrorPage = ({ errorMessage }) => {
    return (
        <div className="error-container">
            <h1>Oops! Something went wrong</h1>
            <p className="error-message">{errorMessage}</p>
        </div>
    );
};

export default memo(ErrorPage);
