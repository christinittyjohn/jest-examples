/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@src(.*)$": "<rootDir>/src$1",
    "@utils(.*)$": "<rootDir>/utils$1",
  },
};
