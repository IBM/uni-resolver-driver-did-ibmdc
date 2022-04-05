/*
 *********************************************************************
 * IBM Confidential
 * 6949-08P
 *
 * © Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *********************************************************************
 */

/* eslint-disable no-unused-vars */

/**
 * Handle axios error types
 *
 * @param {object} error AxiosError
 * @param {object} res Express response
 * @returns {object} status
 */
function handleAxiosError(error, res) {
    if (error.response) {
        /**
         * Request was made and server responded with status code
         * that falls out of range of 2xx. Returns target request
         * status and data
         */
        const { data } = error.response;
        return {
            statusCode: error.response.status,
            response: {
                message: error.message,
                ...data
            }
        };
    } else if (error.request) {
        /**
         * Request was made but no response was received. Returns
         * 424 Failed Dependency with error message
         */
        return {
            statusCode: 424,
            response: {
                message: error.message
            }
        };
    }
}

const ErrorController = (error, req, res, next) => {
    let statusCode;
    let response;

    if (error.response) {
        /**
         * If error is AxiosError
         */
        const axiosError = handleAxiosError(error, res);
        statusCode = axiosError.statusCode;
        response = axiosError.response;
    } else if (error.statusCode) {
        /**
         * If error is internal error
         */
        statusCode = error.statusCode;
        response = {
            message: error.message
        };
    } else {
        statusCode = 400;
        response = {
            message: error.message
        };
    }

    res.status(statusCode).json(response);
};

module.exports = ErrorController;
