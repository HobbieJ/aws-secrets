import { beforeEach, expect, test, vi } from 'vitest';
import { fs, vol } from 'memfs';
import writeEnv from './write_env';

vi.mock('node:fs');
vi.mock('node:fs/promises');

// Constants
const TEST_DATA = `
  testKeyOne='testValueOne'
  testKeyTwo='testValueTwo'
  
`;
const TEST_PATH = '/';
const ENV = 'env';

// Tests
test('writeEnv writes given data to file', async () => {
  expect(() => {
    writeEnv(TEST_PATH, TEST_DATA);
  }).not.toThrowError();

  expect(() => {
    fs.readFile(`${TEST_PATH}/.${ENV}`, 'utf8', (error, data) => {
      if (error) {
        throw error;
      }
      expect(data).toBe(TEST_DATA);
    });
  }).not.toThrowError();
});

// Helper Functions
beforeEach(() => {
  vol.reset();
});
