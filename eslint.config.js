const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["eslint.config.js"],
    languageOptions: { globals: { ...globals.node } },
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, marked: "readonly" },
      ecmaVersion: 2022,
    },
  },
  {
    files: ["public/js/theme-mode.js"],
    rules: { "no-unused-vars": ["error", { "varsIgnorePattern": "^switchTheme$" }] },
  },
];
