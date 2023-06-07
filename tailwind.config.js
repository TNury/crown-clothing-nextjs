/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,jsx,tsx}', './app/**/*.{js,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        md: '1024px',
        lg: '1440px',
        xl: '1920px',
      },
      colors: {
        'opaque-white': {
          30: '#ffffff30',
          90: '#ffffff90',
        },
        darkgray: 'darkgray',
      },
    },
  },
  plugins: [],
};
