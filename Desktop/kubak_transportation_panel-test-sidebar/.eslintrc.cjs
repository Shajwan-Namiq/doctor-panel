module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "vue/no-deprecated-slot-attribute": "off", // Use double quotes here
    "vue/multi-word-component-names": "off",
    "no-prototype-builtins": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "vue/no-setup-props-destructure": "off", // Change this to 0, 1, or 2
    "vue/require-toggle-inside-transition": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "vue/no-dupe-keys": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto", // Use double quotes here
      },
    ],
  },
};
