// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: "node",
  testMatch: [
    "**/tests/**/*.ts",
  ],
  transform: {
    ".ts": "ts-jest",
  },
};
