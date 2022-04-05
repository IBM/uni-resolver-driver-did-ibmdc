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

const config = require('config');
const set = require('lodash/set');

/**
 * Return a new config object based on a target input
 *
 * @param {object} obj the config object
 * @param {object} target the target object
 * @returns {object} the new config boject
 */
function createConfigObject(obj, target = {}) {
    for (const key in obj) {
        if (obj[key]) {
            const value = obj[key];
            const joinedKeys = key.split('__').join('.').toUpperCase();
            set(target, joinedKeys, value);
        }
    }
    return target;
}

config.util.extendDeep(config, createConfigObject(process.env));

module.exports = config;
