const baseConfig = require('./../../jest.base.config');

const apiClientJestConfig = { ...baseConfig };

apiClientJestConfig.collectCoverageFrom = [
  'src/**/*.ts',
  '!src/types/**',
  '!src/index.ts'
];

module.exports = apiClientJestConfig;
