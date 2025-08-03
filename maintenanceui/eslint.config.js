//import js from '@eslint/js'
//import globals from 'globals'
//import reactHooks from 'eslint-plugin-react-hooks'
//import reactRefresh from 'eslint-plugin-react-refresh'
//import { defineConfig, globalIgnores } from 'eslint/config'

//export default defineConfig([
//  globalIgnores(['dist']),
//  {
//    files: ['**/*.{js,jsx}'],
//    extends: [
//      js.configs.recommended,
//      reactHooks.configs['recommended-latest'],
//      reactRefresh.configs.vite,
//    ],
//    languageOptions: {
//      ecmaVersion: 2020,
//      globals: globals.browser,
//      parserOptions: {
//        ecmaVersion: 'latest',
//        ecmaFeatures: { jsx: true },
//        sourceType: 'module',
//      },
//    },
//    rules: {
//      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//    },
//  },
//])
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true // ��� ��� ����� ������� Node.js
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime' // ��� ��� ������ ������� ������� React
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks' // ��� ��� ������ �� ����� Hooks
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'no-unused-vars': 'warn',

        // ��� ��� ������� ������
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-uses-react': 'off', // ����� �� JSX Runtime ������
        'react/jsx-uses-vars': 'error'
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    // ��� ��� ����� ����� �� ����� �������
    ignorePatterns: ['vite.config.js', '*.cjs'],
};