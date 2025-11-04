/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e", // verde do botão principal
        secondary: "#0ea5e9", // azul para destaque
      },
    },
  },
  plugins: [],
};
