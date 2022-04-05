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

const request = require('supertest');
const app = require('../server/server');

describe('Server Routes', () => {
    test('should return status code 404 when route does not exist', async () => {
        const response = await request(app).get('/invalid/route');

        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ error: 'Endpoint not found' });
    });
});
