import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReact from 'eslint-plugin-react'
import pluginJSXA11y from 'eslint-plugin-jsx-a11y'
import pluginImport from 'eslint-plugin-import'
import globals from 'globals'
import pluginNext from '@next/eslint-plugin-next'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginTailWindCSS from 'eslint-plugin-tailwindcss'
import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nextJsConfig = [
  ...baseConfig,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
    settings: { react: { version: 'detect' } },
  },
  {
    plugins: {
      '@next/next': pluginNext,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJSXA11y,
      import: pluginImport,
      prettier: pluginPrettier,
      tailwindcss: pluginTailWindCSS,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJSXA11y.configs.recommended.rules,
      'import/order': [
        'warn',
        {
          pathGroups: [
            { pattern: '@/app/**/*', group: 'external', position: 'after' },
            { pattern: '@/widgets/**/*', group: 'external', position: 'after' },
            { pattern: '@/features/**/*', group: 'external', position: 'after' },
            { pattern: '@/entities/**/*', group: 'external', position: 'after' },
            { pattern: '@/shared/**/*', group: 'external', position: 'after' },
          ],
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
          distinctGroup: false,
        },
      ],
      'import/no-unresolved': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/self-closing-comp': 'warn',
      'jsx-a11y/label-has-associated-control': ['error', { some: ['nesting', 'id'] }],
      'prettier/prettier': 'warn',
    },
  },
  ...pluginTailWindCSS.configs['flat/recommended'],
]
