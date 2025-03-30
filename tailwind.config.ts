/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Chonburi", "system-ui", "serif"],
      },
      colors: {
        palecream: "#fcf9dc",
        fern: "#4e7c3c",
        sage: "#a0c59b",
        cream: "#f9f1ca",
        orange: "#f7a659",
        gold: "#ffcf0e",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
    },
  },
  plugins: [],
};
