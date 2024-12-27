/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#19233b',
          light: '#2e436a',
        },
        accent: '#ff8400',
      }
    },
  },
  plugins: [],
};