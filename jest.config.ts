import type {Config} from 'jest';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@exmpl/(.*)': '<rootDir>/src',
  },
};
