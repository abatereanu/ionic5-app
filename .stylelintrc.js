module.exports = {
  plugins: ['stylelint-prettier'],
  extends: ['stylelint-prettier/recommended', 'stylelint-config-standard'],
  rules: {
    'prettier/prettier': true,
  },
};
