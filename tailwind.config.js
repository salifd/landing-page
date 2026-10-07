/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Quikku brand design system
        cream: '#f3f0e9',
        'deep-blue': '#0a2472',
        midnight: '#001c55',
        sky: '#a6e1fa',
        coral: '#ff5c5c',
        sun: '#ffd34d',
        stone: '#8a857b',
        hairline: '#e5e2db',
        primary: '#0A2472',
        secondary: '#A6E1FA',
        accent: {
          dark: '#001C55',
          coral: '#FF6B6B',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-in-out both',
        'slide-up': 'slideUp 0.5s ease-out both',
        'slide-left': 'slideLeft 0.7s ease-out both',
        'slide-right': 'slideRight 0.7s ease-out both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 32s linear infinite',
        'marquee-reverse': 'marqueeReverse 38s linear infinite',
        'drift-1': 'drift1 18s ease-in-out infinite',
        'drift-2': 'drift2 24s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        drift1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.97)' },
        },
        drift2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '40%': { transform: 'translate(-35px, 25px) scale(1.04)' },
          '70%': { transform: 'translate(25px, -15px) scale(0.98)' },
        },
      },
    },
  },
  plugins: [],
}
