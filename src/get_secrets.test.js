// TODO: Implement Automock for AWS SDK
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  DecryptionFailure,
  InvalidParameterException,
  InvalidRequestException,
  ResourceNotFoundException,
  InternalServiceError
} from '@aws-sdk/client-secrets-manager';
import getSecrets from './get_secrets';

let secretManagerMock;

// Constants
const VALID_TEST_PROJECT = 'test';
const VALID_TEST_DATA = '{"testKeyOne":"testValueOne","testKeyTwo":"testValueTwo"}';
const INVALID_TEST_PROJECT = 'invalid_test';

// Tests
describe('valid data', () => {
  test('getSecrets returns a string', async () => {
    setupValidMockClient();
  
    const data = await getSecrets(VALID_TEST_PROJECT);
  
    expect(typeof data).to.equal('string');
  
    expect(typeof data).not.to.equal('object');
    expect(typeof data).not.to.equal('undefined');
    expect(typeof data).not.to.equal('boolean');
    expect(typeof data).not.to.equal('number');
    expect(typeof data).not.to.equal('bigint');
    expect(typeof data).not.to.equal('symbol');
  });
  
  test('getSecrets returns a parsable JSON string', async () => {
    setupValidMockClient();
  
    const data = await getSecrets(VALID_TEST_PROJECT);
    expect(() => {
      parseJson(data)
    }).not.toThrowError();
  });
});

// Helper Functions
beforeAll(() => {
  secretManagerMock = mockClient(SecretsManagerClient);
});

beforeEach(() => {
  secretManagerMock.reset();
});

const setupValidMockClient = () => {
  secretManagerMock.on(GetSecretValueCommand, {
    SecretId: VALID_TEST_PROJECT
  }).resolves({
    SecretString: VALID_TEST_DATA
  });
};

const setupDecryptionFailureMockClient = () => {
  secretManagerMock.on(GetSecretValueCommand, {
    SecretId: INVALID_TEST_PROJECT
  }).rejects(DecryptionFailure);
}

const setupInvalidParameterExceptionMockClient = () => {
  secretManagerMock.on(GetSecretValueCommand, {
    SecretId: INVALID_TEST_PROJECT
  }).rejects(InvalidParameterException);
}

const setupInvalidRequestExceptionMockClient = () => {
  secretManagerMock.on(GetSecretValueCommand, {
    SecretId: INVALID_TEST_PROJECT
  }).rejects(InvalidRequestException);
}

const setupResourceNotFoundExceptionMockClient = () => {
  secretManagerMock.on(GetSecretValueCommand, {
    SecretId: INVALID_TEST_PROJECT
  }).rejects(ResourceNotFoundException);
}

const setupInternalServiceErrorMockClient = () => {
  secretManagerMock.on(GetSecretValueCommand, {
    SecretId: INVALID_TEST_PROJECT
  }).rejects(InternalServiceError);
}

const parseJson = (string) => {
  JSON.parse(string);
};
