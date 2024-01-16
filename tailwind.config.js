/** @type {import('tailwindcss').Config} */
export default {
  content: ["components/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
