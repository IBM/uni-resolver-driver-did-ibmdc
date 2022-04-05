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

require('dotenv').config();

const http = require('http');
const config = require('../server/utils/config');
const app = require('./server');

const port = config.PORT || 3000;

/**
 * start application
 */
async function start() {
    startServer({ app, port });
}

const startServer = ({ app, port }) => {
    console.debug(`index#startServer starting server on ${port}`);
    const server = http.createServer(app);

    server.listen(port);
    console.info(`index#startServer listening on ${port}`);
};

start()
    .then(() => console.info('app started successfully'))
    .catch(() => console.error('app failed to start'));
