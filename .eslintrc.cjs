module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "i18n"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "i18n/no-russian-character": 1,
    "no-console": 1,
    "@typescript-eslint/no-non-null-assertion": 0,
    "import/no-unresolved": 0,
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    window: true,
    module: true,
  },
};
