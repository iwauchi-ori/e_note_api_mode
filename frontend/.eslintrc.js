module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'next', 'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
    },
    plugins: [
      'react',
      '@typescript-eslint',
    ],
    rules: {
      // next
      '@next/next/no-img-element': 'off',
      // react
      'react/react-in-jsx-scope': ['off'],
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        }
      ],
      'react/jsx-props-no-spreading': 'off',
      // typescript
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
