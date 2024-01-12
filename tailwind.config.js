/** @type {import('tailwindcss').Config} */
export default {
  content: ["components/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--consent-button-bg-color)",
          hover: "var(--consent-button-bg-color-hover)",
          text: "var(--consent-button-text-color)",
          "text-hover": "var(--consent-button-text-color-hover)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
