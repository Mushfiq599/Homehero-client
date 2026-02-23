/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', 
        secondary: '#10B981', 
        accent: '#F59E0B', 
        bgLight: '#F0F9FF', 
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate"],
  },
  darkMode: 'class', 
};