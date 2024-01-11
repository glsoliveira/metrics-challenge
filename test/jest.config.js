module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost",
  },

  moduleNameMapper: {
    "\\.module\\.css$": "<rootDir>/src/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },

  setupFiles: ["<rootDir>/jest.setup.js"],
};
