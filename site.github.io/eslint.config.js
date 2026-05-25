import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginRouter from '@tanstack/eslint-plugin-router';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'public', 'src/routeTree.gen.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      // see https://typescript-eslint.io/users/configs for more tseslint configs
      //tseslint.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
      reactHooks.configs.flat.recommended,
      //reactRefresh.configs.vite,
      pluginRouter.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn', //"error" "off" ("warn" is default)
      reportUnusedInlineConfigs: 'warn', //"error" "off" ("warn" is default)
    },
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      // // Use the following for tseslint plugin recommended-type-checked and strict-type-checked rulesets
      // '@typescript-eslint/only-throw-error': [
      //   'error',
      //   {
      //     allow: [
      //       {
      //         from: 'package',
      //         package: '@tanstack/router-core',
      //         name: 'Redirect',
      //       },
      //       {
      //         from: 'package',
      //         package: '@tanstack/router-core',
      //         name: 'NotFoundError',
      //       },
      //     ],
      //   },
      // ],
    },
  },
]);
