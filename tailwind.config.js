// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FAD1E6',
        'pastel-blue': '#D1E8FAD1',
        'pastel-green': '#D1FAD7',
        'pastel-purple': '#E6D1FA',
        'pastel-yellow': '#FAF1D1',
        'brand-primary': '#F0A6CA', // A slightly stronger pink for accents
        'brand-secondary': '#A6C8F0',
        'text-primary': '#333333',
        'text-secondary': '#555555',
        'bg-main': '#FFF9FB', // A very light, warm background
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}