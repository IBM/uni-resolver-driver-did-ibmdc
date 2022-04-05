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

const express = require('express');
const PublicBFFController = require('../controllers/PublicBFFController');
const config = require('../utils/config');
const router = express.Router();

const endpoint = config.API_VERSION['1.0'] + config.API_BASE;

router.get(endpoint + '/:did', PublicBFFController.resolveDid);

module.exports = router;
