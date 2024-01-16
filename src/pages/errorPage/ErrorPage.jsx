import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './ErrorPage.css';

const ErrorPage = ({ errorMessage }) => {
    return (
        <div className="error-container">
            <h1>Oops! Something went wrong</h1>
            <p className="error-message">{errorMessage.toString()}</p>
        </div>
    );
};

ErrorPage.propTypes = {
    errorMessage: PropTypes.string.isRequired,
};

export default memo(ErrorPage);
