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

module.exports = {
    rules: {
        'references-empty': [2, 'never'],
        'header-max-length': [2, 'always', 100],
        'subject-full-stop': [2, 'never'],
        'body-leading-blank': [1, 'always'],
        'body-max-line-length': [2, 'always', 100],
        'footer-max-line-length': [2, 'always', 100]
    },
    parserPreset: {
        parserOpts: {
            referenceActions: null,
            issuePrefixes: ['LCNCP-']
        }
    }
};
