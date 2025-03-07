import { createTheme, rem } from '@mantine/core'

const breakpoints = {
  xs: '20rem',
  sm: '30rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
}

export const defaultThemeSchema = createTheme({
  fontFamily:
    'var(--pretendard), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  fontSizes: { xs: rem(12), sm: rem(14), md: rem(16), lg: rem(18), xl: rem(20) },
  breakpoints,
})

/** @type {import('tailwindcss').Config} */
export const config = {
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:not([data-mantine-color-scheme="light"] *) }',
      '&:is([data-mantine-color-scheme="dark"] *)',
    ],
  ],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: 'var(--mantine-color-gray-0)',
          100: 'var(--mantine-color-gray-1)',
          200: 'var(--mantine-color-gray-2)',
          300: 'var(--mantine-color-gray-3)',
          400: 'var(--mantine-color-gray-4)',
          500: 'var(--mantine-color-gray-5)',
          600: 'var(--mantine-color-gray-6)',
          700: 'var(--mantine-color-gray-7)',
          800: 'var(--mantine-color-gray-8)',
          900: 'var(--mantine-color-gray-9)',
        },
        dark: {
          50: 'var(--mantine-color-dark-0)',
          100: 'var(--mantine-color-dark-1)',
          200: 'var(--mantine-color-dark-2)',
          300: 'var(--mantine-color-dark-3)',
          400: 'var(--mantine-color-dark-4)',
          500: 'var(--mantine-color-dark-5)',
          600: 'var(--mantine-color-dark-6)',
          700: 'var(--mantine-color-dark-7)',
          800: 'var(--mantine-color-dark-8)',
          900: 'var(--mantine-color-dark-9)',
        },
        red: {
          50: 'var(--mantine-color-red-0)',
          100: 'var(--mantine-color-red-1)',
          200: 'var(--mantine-color-red-2)',
          300: 'var(--mantine-color-red-3)',
          400: 'var(--mantine-color-red-4)',
          500: 'var(--mantine-color-red-5)',
          600: 'var(--mantine-color-red-6)',
          700: 'var(--mantine-color-red-7)',
          800: 'var(--mantine-color-red-8)',
          900: 'var(--mantine-color-red-9)',
        },
        yellow: {
          50: 'var(--mantine-color-yellow-0)',
          100: 'var(--mantine-color-yellow-1)',
          200: 'var(--mantine-color-yellow-2)',
          300: 'var(--mantine-color-yellow-3)',
          400: 'var(--mantine-color-yellow-4)',
          500: 'var(--mantine-color-yellow-5)',
          600: 'var(--mantine-color-yellow-6)',
          700: 'var(--mantine-color-yellow-7)',
          800: 'var(--mantine-color-yellow-8)',
          900: 'var(--mantine-color-yellow-9)',
        },
        green: {
          50: 'var(--mantine-color-teal-0)',
          100: 'var(--mantine-color-teal-1)',
          200: 'var(--mantine-color-teal-2)',
          300: 'var(--mantine-color-teal-3)',
          400: 'var(--mantine-color-teal-4)',
          500: 'var(--mantine-color-teal-5)',
          600: 'var(--mantine-color-teal-6)',
          700: 'var(--mantine-color-teal-7)',
          800: 'var(--mantine-color-teal-8)',
          900: 'var(--mantine-color-teal-9)',
        },
        blue: {
          50: 'var(--mantine-color-indigo-0)',
          100: 'var(--mantine-color-indigo-1)',
          200: 'var(--mantine-color-indigo-2)',
          300: 'var(--mantine-color-indigo-3)',
          400: 'var(--mantine-color-indigo-4)',
          500: 'var(--mantine-color-indigo-5)',
          600: 'var(--mantine-color-indigo-6)',
          700: 'var(--mantine-color-indigo-7)',
          800: 'var(--mantine-color-indigo-8)',
          900: 'var(--mantine-color-indigo-9)',
        },
      },
      screens: breakpoints,
      animation: {
        'pop-spin': 'pop-spin 0.5s',
      },
      keyframes: {
        'pop-spin': {
          '0%': { transform: 'rotate(-360deg) scale(0)', opacity: '0' },
          '75%': { transform: 'rotate(25deg)' },
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
