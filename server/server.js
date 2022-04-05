/*
 *********************************************************************
 * IBM Confidential
 * 6949-08P
 *
 * © Copyright IBM Corp. 2021 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *********************************************************************
 */

// import dependencies and initialize express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Routes = require('./routes/routes');
const config = require('./utils/config');
const ErrorHandler = require('./utils/ErrorHandler');

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define routes
app.use(Routes);
app.use(ErrorHandler);

app.get('/', (req, res) => {
    res.status(200).json({
        message: `Application is running on ${config.PORT} in ${config.NODE_ENV}`
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;
