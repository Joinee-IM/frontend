module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'prettier',
    'simple-import-sort',
    'no-relative-import-paths',
    'react-hooks',
  ],
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // External packages
          ['^@?\\w'],

          // Constants
          ['env', 'AppConstants'],

          // Type imports
          ['^.*\\u0000$'],

          // Internal packages inside `src` folder
          [
            '^(components|context|hooks|icons|layout|lib|modules|services|shared|theme|utils|constants)(/.*|$)',
          ],

          // Side effect imports
          ['^\\u0000'],

          // Parent imports; put `..` last
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

          // Other relative imports; put same folder imports and `.` last
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

          // Style imports
          ['^.+\\.s?css$'],

          // Static assets
          ['^(static)(/.*|$)'],
        ],
      },
    ],
    'no-relative-import-paths/no-relative-import-paths': [
      'warn',
      { allowSameFolder: false, prefix: '@' },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
};
