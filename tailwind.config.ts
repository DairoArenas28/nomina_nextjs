/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-green-100',
    'bg-red-100',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
