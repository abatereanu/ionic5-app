module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  printWidth: 120,
  endOfLine: 'auto',
  overrides: [
    {
      // only for html - 140 line length
      files: 'src/**/*.html',
      options: {
        printWidth: 140,
      },
    },
  ],
};
