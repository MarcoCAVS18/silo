// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      animation: {
        slideInUp: 'slideInUp 1s ease-out forwards',
      },
      keyframes: {
        slideInUp: {
          '0%': {
            transform: 'translateY(100%)',
            visibility: 'visible',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
      colors: {
        neuphormism: {
          light: {
            primary: '#E6E6E6',
            secondary: '#FFFFFF',
            shadow: '#D1D1D1',
          },
          dark: {
            primary: '#1E1E1E',
            secondary: '#2C2C2C',
            shadow: '#121212',
          }
        }
      }
    },
  },
  plugins: [],
}