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
const moxios = require('moxios');
const config = require('../../server/utils/config');
const app = require('../../server/server');

describe('PublicBFFController', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('GET /1.0/identifiers/:did from DEV', () => {
        let endpoint, targetEndpoint, result;
        const did = 'did:idc:24aa46b3-4ae9-4941-89e9-725cd15f7246';

        beforeEach(() => {
            endpoint = config.API_VERSION['1.0'] + config.API_BASE + `/${did}`;
            targetEndpoint = config.PUBLIC_BFF_URL.PROD + config.API_VERSION.V1 + `/dids/${did}`;

            result = {
                id: did
            };
        });
        test('should call default target endpoint and return status and response body of GET downstream call', async () => {
            moxios.stubRequest(targetEndpoint, {
                status: 200,
                response: result
            });
            const response = await request(app).get(endpoint);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(result);
        });

        test("should call dev endpoint when namespace 'dev' is provided", async () => {
            moxios.stubRequest(
                config.PUBLIC_BFF_URL.DEV + config.API_VERSION.V1 + `/dids/${did}:dev`,
                {
                    status: 200,
                    response: result
                }
            );
            const response = await request(app).get(endpoint + ':dev');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(result);
        });

        test("should call qa endpoint when namespace 'qa' is provided", async () => {
            moxios.stubRequest(
                config.PUBLIC_BFF_URL.QA + config.API_VERSION.V1 + `/dids/${did}:qa`,
                {
                    status: 200,
                    response: result
                }
            );
            const response = await request(app).get(endpoint + ':qa');

            expect(response.status).toEqual(200);
            expect(response.body).toEqual(result);
        });

        test("should call qa endpoint when namespace 'stage' is provided", async () => {
            moxios.stubRequest(
                config.PUBLIC_BFF_URL.STAGE + config.API_VERSION.V1 + `/dids/${did}:stage`,
                {
                    status: 200,
                    response: result
                }
            );
            const response = await request(app).get(endpoint + ':stage');

            expect(response.status).toEqual(200);
            expect(response.body).toEqual(result);
        });

        test('should return 400 status if call fails', async () => {
            moxios.stubRequest(targetEndpoint, {
                status: 400
            });
            const response = await request(app).get(endpoint);

            expect(response.status).toEqual(400);
        });
    });
});
