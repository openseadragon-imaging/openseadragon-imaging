import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ignores: [
      //   'eslint.configOLD.js',
      //   'eslint.config - Copy.js',
      //   'eslint.config.ts',
      // 'postcss.config.cjs',
      'src/routeTree.gen.ts',
    ],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    // settings: {
    //   react: {
    //     version: 'detect',
    //   },
    // },
  },
  tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  {
    files: ['**/*.json'],
    ignores: [
      'package-lock.json',
      '.vscode/launch.json',
      '.vscode/settings.json',
    ],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
    // rules: {
    //   'markdown/fenced-code-language': 'warn',
    // },
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
]);
