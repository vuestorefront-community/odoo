const baseConfig = require('./../../jest.base.config');

const apiClientJestConfig = {
  setupFilesAfterEnv: ['./__mocks__/setupTests.ts'],
  ...baseConfig
};

apiClientJestConfig.collectCoverageFrom = [
  'src/**/*.ts',
  '!src/types/**',
  '!src/gql/**',
  '!src/index.ts'
];

module.exports = apiClientJestConfig;
