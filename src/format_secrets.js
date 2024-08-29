import * as chalk from '../lib/chalk.js';

function formatSecrets(secrets) {
  let envFile = '';

  try {
    JSON.parse(secrets, (key, value) => {
      if (key) {
        envFile += `${key}='${value}'\n`;
      }
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(chalk.error('Error: Secret was invalid JSON. Please check the secret in AWS.'));
    } else {
      console.error(chalk.error('Error: Unknown. Details are below:\n'));
    }
    throw error;
  }

  return envFile;
}

export default formatSecrets;
