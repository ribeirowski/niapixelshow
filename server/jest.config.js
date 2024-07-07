module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.steps.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    maxWorkers: 1, // Adiciona esta linha para executar os testes sequencialmente
  };
  