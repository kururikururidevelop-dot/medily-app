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
          DEFAULT: '#2DB596',
          light: '#4CCAB0',
          dark: '#1E8F75',
          ultralight: '#E8F8F4',
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
