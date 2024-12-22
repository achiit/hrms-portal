/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        dark: '#2C3E50',
        light: '#F7F9FC',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Archivo Black', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0 0 #000',
        'brutal-lg': '8px 8px 0 0 #000',
      },
    },
  },
  plugins: [],
};