#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import getSecrets from './src/get_secrets.js';
import formatSecrets from './src/format_secrets.js';
import writeEnv from './src/write_env.js';

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 -p [project]')
  .example('$0 -p test-project', 'Downloads the developer .env file for test-project')
  .option('project', {
    alias: 'p',
    describe: 'Project name',
    demandOption: true,
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .epilogue('Made with ❤️  by Jacob Hobbie')
  .parse();

// Constants
const PROJECT = argv.project;
const PATH = process.cwd();

// Main
const secrets = await getSecrets(PROJECT);
const envFile = formatSecrets(secrets);
writeEnv(PATH, envFile);
