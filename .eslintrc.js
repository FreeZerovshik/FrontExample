module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/airbnb",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vuejs-accessibility/anchor-has-content": "off",
    "vuejs-accessibility/click-events-have-key-events": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "jsx-a11y/click-events-have-key-events": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-plusplus": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "vue/no-mutating-props": "off",
    "object-curly-newline": ["error", { ImportDeclaration: "never" }],
    "operator-linebreak": [
      "error",
      "after",
      { overrides: { "?": "before", ":": "before" } },
    ],
    "implicit-arrow-linebreak": "off",
    "import/prefer-default-export": "off",
    "comma-dangle": ["error", "only-multiline"],
    "vue/multi-word-component-names": "off",
    "vuejs-accessibility/no-autofocus": "off",
    "vuejs-accessibility/label-has-for": [
      "error",
      {
        components: ["label"],
        controlComponents: [
          "InputText",
          "Password",
          "Checkbox",
          "Dropdown",
          "RadioButton",
          "InputNumber",
          "Textarea",
        ],
        required: {
          every: ["id"],
        },
        allowChildren: false,
      },
    ],
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
