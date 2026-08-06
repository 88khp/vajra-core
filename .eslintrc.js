module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-native', 'import', 'simple-import-sort', 'check-file'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ExportDefaultDeclaration',
        message: 'Default exports are not allowed. Use named exports only.',
      },
    ],

    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'any', prev: 'export', next: 'export' },
      { blankLine: 'always', prev: 'const', next: 'expression' },
      { blankLine: 'always', prev: 'expression', next: 'const' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],

    'eol-last': ['error', 'always'],

    'prefer-arrow-callback': 'error',
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: { regex: '^T[A-Z]', match: true },
      },
    ],

    'import/namespace': 'off',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'error',

    'check-file/filename-naming-convention': [
      'error',
      { '**/*.{ts,tsx}': 'KEBAB_CASE' },
      { ignoreMiddleExtensions: true },
    ],
  },
  env: {
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: true,
    },
  },
};
