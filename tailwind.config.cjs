/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFB03B',
          light: '#FFC266',
          dark: '#CC8D2F',
          ultralight: '#FFF6E5',
        },
        'background-light': '#f9fafb',
        'background-dark': '#111827',
        'surface-light': '#ffffff',
        'surface-dark': '#1f2937',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
