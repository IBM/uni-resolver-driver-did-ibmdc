module.exports = {
    testMatch: ['<rootDir>/tests/_integration/**/*.int.test.js'],
    collectCoverageFrom: ['server/repository/*Repository.js'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    }
};
