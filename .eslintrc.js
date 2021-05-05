module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: [
          "tsconfig.*?.json",
          "e2e/tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        '@ionic/eslint-config/recommended',
        // AirBnB Styleguide rules
        'airbnb-typescript/base',
        // Settings for Prettier
        'plugin:prettier/recommended',
        'prettier',
      ],
      rules: {
        "@angular-eslint/component-class-suffix": [
          "error",
          {
            suffixes: ["Component", "Page"],
          },
        ],
        'linebreak-style': ['error', 'windows'],
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'no-plusplus': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
      }
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140 }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    }
  ]
}
