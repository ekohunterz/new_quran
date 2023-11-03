/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    fontFamily: {
      sans: 'Quicksand, sans-serif',
      mono: 'Scheherazade New, serif',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },
    extend: {
      colors: {
        primary: '#03AA77',
        secondary: '#FDFDFD',
        alternative: '#0F543F',
        primary_dark: '#101d19',
      },
    },
  },
  plugins: [],
}
