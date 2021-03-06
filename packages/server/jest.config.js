module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/utils/setupTests.ts'],
  moduleNameMapper: {
    '@models/(.*)': '<rootDir>/src/app/models/$1',
    '@controllers/(.*)': '<rootDir>/src/app/controllers/$1',
    '@middlewares/(.*)': '<rootDir>/src/app/middlewares/$1',
    '@utils/(.*)': '<rootDir>/src/app/utils/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@tests/(.*)': '<rootDir>/src/__tests__/$1',
    '@database': '<rootDir>/src/database/index.ts',
    '@types': '<rootDir>/src/app/types.ts',
    '@app': '<rootDir>/src/app.ts',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    // '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
};
