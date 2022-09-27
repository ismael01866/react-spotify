const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components/$1',
    '^layout(.*)$': '<rootDir>/src/layout/$1',
    '^pages(.*)$': '<rootDir>/src/pages/$1',
    '^modules(.*)$': '<rootDir>/src/modules/$1',
    '^features(.*)$': '<rootDir>/src/features/$1',
    '^lib(.*)$': '<rootDir>/src/lib/$1',
    '^types(.*)$': '<rootDir>/src/types/$1'
  }
};

module.exports = createJestConfig(customJestConfig);
