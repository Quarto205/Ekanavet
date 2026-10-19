/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#047857', // Emerald 700 - Trusted Medical Green
          light: '#34d399',   // Emerald 400 - Fresh Accent
          dark: '#064e3b',    // Emerald 900 - Deep Trust
        },
        surface: {
          light: '#F9FAFB',
          DEFAULT: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FFFFFF', // White
        },
        accent: {
          DEFAULT: '#F3F4F6', // Light Grey
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
