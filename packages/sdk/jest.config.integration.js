const baseConfig = require('./../../jest.base.config');

module.exports = {
  ...baseConfig,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(j|t)s$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  globalSetup: './__tests__/integration/__config__/jest.setup.global.ts',
  globalTeardown: './__tests__/integration/__config__/jest.teardown.global.ts',
  setupFilesAfterEnv: ['./__tests__/integration/__config__/jest.setup.ts']
};
