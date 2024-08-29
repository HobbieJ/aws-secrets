import {
  SecretsManagerClient,
  GetSecretValueCommand,
  DecryptionFailure,
  InvalidParameterException,
  InvalidRequestException,
  ResourceNotFoundException,
  InternalServiceError
} from '@aws-sdk/client-secrets-manager';
import * as chalk from '../lib/chalk.js';

async function getSecrets(project) {
  const client = new SecretsManagerClient();
  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: project
      })
    );
  } catch (error) {
    if (error instanceof DecryptionFailure) {
      console.error(chalk.error('Error: Unable to decrypt the secret. Check if the secret is encrypted with the correct key.'));
    } else if (error instanceof InvalidParameterException) {
      console.error(chalk.error('Error: Invalid parameter.'));
    } else if (error instanceof InvalidRequestException) {
      console.error(chalk.error('Error: The secret is not available. The secret could be:\n- Scheduled for deletion\n- Managed by another service'));
    } else if (error instanceof ResourceNotFoundException) {
      console.error(chalk.error(`Error: Secret '${project}' not found. Check if the project name is correct or if it exists in Secrets Manager.`));
    } else if (error instanceof InternalServiceError) {
      console.error(chalk.error('Error: The server failed to process the request. Please try again or check your internet connection.'));
    } else {
      console.error(chalk.error('Error: Unknown. Details are below:\n'));
    }
    throw error;
  }
  
  return response.SecretString;
}

export default getSecrets;
