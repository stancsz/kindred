/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mystic: {
          900: '#0f172a', // Deep night blue
          800: '#1e1b4b', // Deep indigo
          700: '#312e81',
          600: '#4338ca',
          500: '#6366f1',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'starry': "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)",
        'card-gradient': "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      }
    },
  },
  plugins: [],
}
