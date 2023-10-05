/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,jsx,tsx}', './app/**/*.{js,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        md: '1280px',
        lg: '1440px',
        xl: '1920px',
      },
      colors: {
        'gray-1': '#F5F5F5',
        'gray-2': '#D9D9D9',
        'gray-3': '#ACACAC',
        'gray-4': '#8F8F8F',
        'opaque-white': {
          30: '#ffffff30',
          90: '#ffffff90',
        },
        'opaque-black': '#00000090',
        darkgray: 'darkgray',
      },
    },
  },
  plugins: [],
};
