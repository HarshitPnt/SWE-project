export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js"],
  globals: {
    NODE_ENV: "test",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  transformIgnorePatterns: ["/node_modules/"],
};
