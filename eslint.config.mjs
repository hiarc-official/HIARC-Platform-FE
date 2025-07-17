import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base JavaScript and TypeScript rules
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Next.js specific rules for apps that use Next.js
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    env: {
      browser: true,
      es2020: true,
      node: true,
    },
  }),
  
  // React and Vite specific configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      
      // Common rules for all projects
      'no-var': 'error',
      'prefer-const': 'error',
      'one-var': ['error', 'never'],
      'no-use-before-define': 'error',
      'no-array-constructor': 'error',
      'prefer-destructuring': [
        'warn',
        {
          array: true,
          object: false,
        },
      ],
      'no-object-constructor': 'error',
      'guard-for-in': 'error',
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      'new-parens': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'PropertyDefinition[key.type="PrivateIdentifier"]',
          message: 'Avoid using #private fields. Use TypeScript visibility modifiers instead.',
        },
      ],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
      'arrow-body-style': ['error', 'as-needed'],
      'no-invalid-this': 'error',
      'no-extra-bind': 'error',
      'prefer-rest-params': 'error',
      'rest-spread-spacing': ['error', 'never'],
      'padded-blocks': ['error', { blocks: 'never' }],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-multi-str': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': ['error', 'never'],
      'unicode-bom': 'off',
      'no-octal-escape': 'error',
      'no-loss-of-precision': 'error',
      'no-implicit-coercion': [
        'error',
        {
          boolean: true,
          number: true,
          string: false,
          allow: [],
        },
      ],
      'no-restricted-globals': ['error', 'parseInt', 'parseFloat'],
      'no-extra-boolean-cast': 'error',
      curly: ['error', 'all'],
      'no-extra-parens': ['error', 'functions'],
      'default-case': 'error',
      'default-case-last': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-throw-literal': 'error',
      'no-empty': ['error', { allowEmptyCatch: false }],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter',
        },
      ],
      'no-new-wrappers': 'error',
      'no-debugger': 'error',
      'no-with': 'error',
      'no-eval': 'error',
      'no-new-func': 'error',
      semi: ['error', 'always'],
      'no-extend-native': 'error',
      'no-global-assign': 'error',
      'id-length': ['warn', { min: 2, exceptions: ['i', 'j', 'k', 'x', 'y', '_'] }],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
          readonly: 'array-simple',
        },
      ],
      '@typescript-eslint/no-explicit-any': [
        'warn',
        {
          fixToUnknown: true,
        },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-ignore': 'allow-with-description',
          minimumDescriptionLength: 5,
        },
      ],
      'react/jsx-no-useless-fragment': 'warn',
    },
  },
  
  // Global ignores
  {
    ignores: ['**/dist/**', '**/build/**', '**/.next/**', '**/node_modules/**'],
  },
];

export default eslintConfig;