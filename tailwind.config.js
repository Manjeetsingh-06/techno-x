/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B19',
          900: '#0B132B',
          850: '#0D1B3E',
          800: '#11224D',
          750: '#152C63',
          700: '#1C3879',
          600: '#254A9E',
        },
        electric: {
          DEFAULT: '#38BDF8',
          glow: '#00F0FF',
          dark: '#0284C7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gloss': '0 8px 32px 0 rgba(0, 15, 60, 0.37)',
        'electric-glow': '0 0 25px -5px rgba(56, 189, 248, 0.4)',
        'blue-glow': '0 0 35px -5px rgba(37, 99, 235, 0.35)',
      }
    },
  },
  plugins: [],
}
