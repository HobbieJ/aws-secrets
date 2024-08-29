import { expect, test } from 'vitest';
import formatSecrets from './format_secrets';

// Constants
const VALID_TEST_DATA = '{"testKeyOne":"testValueOne","testKeyTwo":"testValueTwo"}';
const INVALID_TEST_DATA = '{:"testValueOne","testKeyTwo":"testValueTwo"';
const EXPECTED_REGEXP = /^(\w+)='(\w+)'$/;

// Tests
test('formatSecrets returns a valid .env file string', () => {
  const data = formatSecrets(VALID_TEST_DATA);

  expect(typeof data).to.equal('string');
  
  expect(typeof data).not.to.equal('object');
  expect(typeof data).not.to.equal('undefined');
  expect(typeof data).not.to.equal('boolean');
  expect(typeof data).not.to.equal('number');
  expect(typeof data).not.to.equal('bigint');
  expect(typeof data).not.to.equal('symbol');

  const lines = data.split(/\r?\n/);
  for (let line = 0; line < lines.length; line++) {
    if (line === lines.length - 1) {
      expect(lines[line]).to.equal('');
    } else {
      expect(lines[line]).toMatch(EXPECTED_REGEXP);
    }
  };
});

test('formatSecrets throws "SyntaxError" if the secret is invalid JSON', () => {
  expect(() => {
    const data = formatSecrets(INVALID_TEST_DATA);
  }).toThrowError('JSON');
});
