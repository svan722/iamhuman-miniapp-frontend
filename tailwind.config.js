/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'light': 'black',
        'dark': 'white'
      },
      fontFamily: {
        'suburbia': ['"SUBURBIA PERSONAL USE"', 'sans-serif'],
        'trispace': ['"Trispace"', 'sans-serif'],
        'noto': ['"Noto Sans"', 'sans-serif'],
        'dm': ['"DM Sans"', 'sans-serif'],
        'news': ['"NEWSPAPER PERSONAL USE"', 'sans-serif'],
      }     
    },
  },
  plugins: [
    require('tailwindcss-grid-area'),
  ],
  darkMode: 'selector',
}

