module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  // testMatch: ['<rootDir>/(tests/unit/**/*.spec.(ts|tsx|js)|**/tests/*.(ts|tsx|js))'],
  transformIgnorePatterns: ['/node_modules/(?!test-component).+\\.js$'],
};
