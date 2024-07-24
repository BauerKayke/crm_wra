/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/**/*.{html,ts}",
    "./src/**/**/**/*.{html,ts}",
    "./src/**/**/**/**/*.{html,ts}",
    "./src/**/**/**/**/**/*.{html,ts}",
    "./src/**/**/**/**/**/**/*.{html,ts}",
    "./src/**/**/**/**/**/**/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif']
      },
      colors: {
        'gold': '#FFD700', // Dourado
      },
    },
  },
  plugins: [],
}
