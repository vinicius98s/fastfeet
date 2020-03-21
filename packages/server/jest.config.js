module.exports = {
  bail: true,
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@models/(.*)': '<rootDir>/src/app/models/$1',
    '@controllers/(.*)': '<rootDir>/src/app/controllers/$1',
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
