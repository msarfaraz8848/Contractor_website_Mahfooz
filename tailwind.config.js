/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8EE',
          100: '#F5EFCF',
          200: '#EBDC9C',
          300: '#DFC464',
          400: '#D4B13B',
          500: '#C5A028', // Primary Luxury Gold
          600: '#A7821B',
          700: '#856416',
          800: '#644A14',
          900: '#433110',
          950: '#261B07',
        },
        dark: {
          950: '#07090C', // Deepest Obsidian
          900: '#0D1117', // Main Dark Background
          850: '#131922', // Card Background
          800: '#1A212D', // Elevated Surface
          700: '#2A3445', // Borders & Dividers
          600: '#3D4B63',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Cinzel', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(197, 160, 40, 0.3)',
        'gold-glow-lg': '0 0 40px -5px rgba(197, 160, 40, 0.45)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle at center, rgba(197, 160, 40, 0.15) 0%, transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #F5EFCF 0%, #D4B13B 50%, #A7821B 100%)',
      }
    },
  },
  plugins: [],
}
