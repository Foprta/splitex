const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      cyan: colors.cyan,
      blue: colors.blue,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.green,
    },
  },
  plugins: [],
};
