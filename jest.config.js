module.exports = {
    testMatch: ['<rootDir>/tests/**/*.test.js'],
    testPathIgnorePatterns: ['<rootDir>/tests/_integration'],
    collectCoverageFrom: [
        'server/**/*.js',
        '!server/utils/*.js',
        '!server/server.js',
        '!server/index.js'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    }
};
