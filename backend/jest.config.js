module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleNameMapper: {
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@prisma/(?!client)(.*)$': '<rootDir>/src/prisma/$1', // Exclure tout ce qui commence par @prisma/client
    '^@employe/(.*)$': '<rootDir>/src/employe/$1',
    '^@prisma/client($|/.+)': '<rootDir>/node_modules/@prisma/client$1', // Mapper @prisma/client et ses sous-modules
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};