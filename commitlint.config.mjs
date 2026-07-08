const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["gallery", "blog", "theme", "nav", "deps", "ci", "config"],
    ],
    "scope-empty": [1, "never"],
  },
};

export default commitlintConfig;
