module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["tailwindcss"],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:tailwindcss/recommended",
    "@vue/prettier",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "warn",
    "tailwindcss/no-custom-classname": "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
