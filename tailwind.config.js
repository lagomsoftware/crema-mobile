const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.stone,
      },
    },
  },
  plugins: [],
};
