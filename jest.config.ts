import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './'
});

// Add any custom config to be passed to Jest
const config: Config = {
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: ['components/**/*.{ts,tsx}', 'lib/**/*.{ts, tsx}', 'app/**/*.{ts, tsx}', '!**/node_modules/**']
};

export default createJestConfig(config);
