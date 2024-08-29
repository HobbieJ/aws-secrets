import fs from 'node:fs';
import * as chalk from '../lib/chalk.js';

// Constants
const ENV = 'env';

function writeEnv(path, secrets) {
  fs.writeFile(`${path}/.${ENV}`, secrets, error => {
    if (!error) {
      console.log(chalk.success('File written successfully'));
    } else {
      console.error(chalk.error('Error: Unknown. Details are below:\n'));
      throw new Error(error);
    }
  });
}

export default writeEnv;
