/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // indigo
        secondary: '#10B981', // green
        accent: '#F59E0B', // amber
        bgLight: '#F0F9FF', // light blue for light mode
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate"],
  },
  darkMode: 'class', // ← Add this line
};