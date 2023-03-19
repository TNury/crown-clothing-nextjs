/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '1024px',
      lg: '1440px',
      xl: '1920px',
    },
  },
  plugins: [],
};
