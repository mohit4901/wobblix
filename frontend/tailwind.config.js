/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#e60000',
          bone: '#edece8'
        }
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(-25%) translatex(-50%)', 'animation-timing-function': 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'translateY(0) translatex(-50%)', 'animation-timing-function': 'cubic-bezier(0,0,0.2,1)' }
        },
        'button-pulse': {
          '0%': { 'box-shadow': '0 0 0 0 rgba(230, 0, 0, 0.4)' },
          '70%': { 'box-shadow': '0 0 0 10px rgba(230, 0, 0, 0)' },
          '100%': { 'box-shadow': '0 0 0 0 rgba(230, 0, 0, 0)' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'slow-pulse': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'button-pulse': 'button-pulse 2s infinite',
      }
    },
  },
  plugins: [],
}