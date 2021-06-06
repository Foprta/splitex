const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      blur: {
        1: "1px",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
      height: {
        5.5: "1.375rem",
      },
      width: {
        100: "25rem",
        200: "50rem",
      },
    },
    colors: {
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
