/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          100: "#eee0d8",
          200: "#dcc0b2",
          300: "#cba18b",
          400: "#b98165",
          500: "#a8623e",
          600: "#864e32",
          700: "#653b25",
          800: "#432719",
          900: "#22140c",
        },
      },
    },
  },
  plugins: [],
};
