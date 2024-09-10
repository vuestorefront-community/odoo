module.exports = {
  extends: ['@vue-storefront/eslint-config'
    ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    },
  ignorePatterns: [' /*.*', 'lib/**/*.ts', '**/*.js'],
  rules: {
    'unicorn/prefer-top-level-await': 'off',
  },
};