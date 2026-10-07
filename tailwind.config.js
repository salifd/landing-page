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
    },
  },
  plugins: [],
}
