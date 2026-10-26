import { defineConfig } from "eslint/config";
import css from "@eslint/css";
import html from "@html-eslint/eslint-plugin";

export default defineConfig([
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js"],
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
  {
    files: ["**/*.css"],
    plugins: {
      css,
    },
    language: "css/css",
    rules: {
      "css/no-duplicate-imports": "error",
      "css/no-empty-blocks": "error",
      "css/no-invalid-properties": "error",
      "css/no-invalid-at-rules": "error",
    },
  },
  {
    files: ["**/*.html"],
    plugins: {
      html,
    },
    language: "html/html",
    rules: {
      "html/no-duplicate-class": "error",
      "html/no-duplicate-id": "error",
      "html/require-doctype": "error",
      "html/require-img-alt": "error",
      "html/require-li-container": "error",
    },
  },
]);
