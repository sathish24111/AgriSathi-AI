/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          primary: '#1b5e20',
          secondary: '#2e7d32',
          light: '#e8f5e9',
          accent: '#f57f17',
          surface: '#f8fdf9',
          dark: '#1b2a1c',
          warning: '#f57c00',
          danger: '#d32f2f'
        }
      }
    },
  },
  plugins: [],
}
