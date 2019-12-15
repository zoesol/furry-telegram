module.exports = exports = {
  extends: ['plugin:prettier/recommended', 'react-app'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'jsx-a11y/href-no-hash': OFF, // hack to get rid of warning due to incompatible packages
    'no-console': WARN,
  },
};
