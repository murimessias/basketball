import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/**/index.ts',
    '!src/constants/**/*.ts',
    '!src/libs/**/*.ts',
    '!src/pages/**/*.tsx',
    '!src/styles/**/*.ts',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  modulePaths: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(customJestConfig)
