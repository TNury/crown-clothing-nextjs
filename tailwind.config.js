/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
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
      },
    },
  },
  plugins: [],
};
