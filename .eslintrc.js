module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2,
    "react/no-did-mount-set-state": 2,
    "arrow-body-style" : "warn",
    "react/no-direct-mutation-state": 2,
    "react/jsx-uses-vars": 2,
    "no-undef": 2,
    "semi": 2,
    "react/prop-types": 2,
    "react/jsx-no-bind": 2,
    "react/jsx-no-duplicate-props": 2,
  },
};
