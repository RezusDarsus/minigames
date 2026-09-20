import js from '@eslint/js';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/', 'node_modules/', 'coverage/', '.husky/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  unicorn.configs.recommended,
  {
    linterOptions: {
      noInlineConfig: true,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
);
