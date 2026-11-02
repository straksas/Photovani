/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm-white / cream backgrounds
        cream: {
          50: '#fdfcfa',
          100: '#faf8f4',
          200: '#f4f0e8',
          300: '#ebe4d8',
        },
        // Charcoal / dark gray text
        charcoal: {
          700: '#3a3a3a',
          800: '#2b2b2b',
          900: '#1a1a1a',
        },
        // Accent — muted warm terracotta
        accent: {
          50: '#faf5f2',
          100: '#f3e8e1',
          200: '#e8d2c5',
          300: '#d9b39e',
          400: '#c98e6f',
          500: '#b8704f',
          600: '#a05a3e',
          700: '#834730',
        },
        // Neutrals supplement
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
