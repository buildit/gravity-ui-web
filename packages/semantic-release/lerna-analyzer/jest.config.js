module.exports = {
  clearMocks: true,
  coverageDirectory: "dist/coverage",
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    }
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "tsx"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*",
  ],
  transform: {
    '\\.ts$': 'ts-jest',
  },
};
