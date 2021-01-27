module.exports = {
  root: true,
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true }, // Allows for the parsing of JSX
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['jest', 'import', '@typescript-eslint'],
  extends: [
    'eslint:recommended', // esli110850
    'plugin:@typescript-eslint/eslint-recommended', // eslint TypeScript rules (github.com/typescript-eslint/typescript-eslint)
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended', // eslint react rules (github.com/yannickcr/eslint-plugin-react)
    'plugin:jsx-a11y/recommended', // accessibility plugin

    // Prettier plugin and recommended rules, basically take .prettierrc.js into account
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',

    // quality of life
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'react/prop-types': 'off', // Turn off prop-types rule, as TypeScript's interfaces will be used instead.
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-undef': 'error',
  },
};
