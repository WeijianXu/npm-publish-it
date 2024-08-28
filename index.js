#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';

const { version: currVersion, name } = JSON.parse(
  fs.readFileSync('./package.json', 'utf8')
);

const execPromise = util.promisify(exec);

const init = (options) => {
  console.log(chalk.green(options.title || name || 'Npm Publish It! A very simple npm publish tool'));
  console.log(chalk.green('Current version：' + currVersion));
};

const askQuestions = (options) => {
  const questions = [
    {
      name: 'version',
      type: 'input',
      message:
        'Please input your version:\n（<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git）\n publish again if input is empty \n',
    },
  ];
  if (options.needOtp) {
    questions.push({
      type: 'input',
      name: 'otp',
      message: 'Please input the npm otp: ',
    });
  }
  return inquirer.prompt(questions);
};

const execCommand = async(commands) => {
  let index = 0;
  for (let i = 0; i < commands.length; i++) {
    index = i;
    const command = commands[i];
    const res = await execPromise(command);
    console.log(
      `[${commands[index]}] exec success\n${res.stdout}\n${res.stderr}`
    );
  }
};

const run = async(options = {}) => {
  // show script introduction
  init(options);

  // ask questions
  const answers = await askQuestions(options);
  const { version, otp } = answers;

  const versionCommand = version ? [`npm version ${version}`] : [];

  const commands = [...versionCommand, ...(options.prePublish || []), (options.publishCommand || 'npm publish') + ' --otp=' + otp];
  try {
    await execCommand(commands);
    console.log(chalk.green.bold(`Publish ${name}@${version || currVersion} successfully!`));
  } catch (error) {
    console.log(chalk.red.bold(`error: ${error}`));
    console.log(chalk.red.bold(`Publish ${name}@${version || currVersion} failed!`));
  }
};

export default run;
