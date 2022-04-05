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

const axios = require('axios');
const config = require('../utils/config');

const contentTypeApplicationJSON = 'application/json';
const HTTP_GET = 'get';

class PublicBFFController {}

PublicBFFController.resolveDid = async (req, res, next) => {
    const { did } = req.params;
    console.info('PublicBFFController#resolveDid - publicDid', { did });

    try {
        const namespace = did.split(':')[3];
        const url = _getBaseURL(namespace) + `${config.API_VERSION.V1}/dids/${did}`;
        console.debug('>>>> Request outgoing', {
            url,
            method: HTTP_GET
        });
        const { data } = await axios({
            method: HTTP_GET,
            url,
            headers: {
                Accept: contentTypeApplicationJSON,
                'Content-Type': contentTypeApplicationJSON
            }
        });
        console.debug('<<<< Request success', {
            url,
            method: HTTP_GET
        });
        res.status(200).json(data);
    } catch (err) {
        console.error('PublicBFFController#resolveDid - Failed to call public bff', {
            error: err.message
        });
        next(err);
    }
};

const _getBaseURL = (namespace) => {
    if (!namespace) {
        return config.PUBLIC_BFF_URL.PROD;
    }

    return config.PUBLIC_BFF_URL[namespace.toUpperCase()];
};

module.exports = PublicBFFController;
