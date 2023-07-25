module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'react-native/no-inline-styles': 0,
    curly: ['error', 'multi-line'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  overrides: [
    {
      files: ['*.e2e.js'],
      env: {
        jest: true,
        'jest/globals': true,
      },
    },
  ],
};
