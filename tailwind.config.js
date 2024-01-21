/** @type {import('tailwindcss').Config} */
export default {
  content: ["./lib/**/*.{vue,js}", "./index.html"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
