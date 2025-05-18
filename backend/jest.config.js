module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/index.ts',       // optional: ignore index files
        '!src/**/types.ts'        // optional: ignore types
    ],
};
