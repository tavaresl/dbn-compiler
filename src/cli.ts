#! /usr/bin/env node

import { readFile, writeFile, access, constants } from 'fs';
import { promisify } from 'util';
import { compile } from './compiler/compiler';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const accessAsync = promisify(access);

async function main() {
  const args = process.argv;
  const inputCmdIndex = args.findIndex(arg => arg === '-i' || arg === '--input');
  const outputCmdIndex = args.findIndex(arg => arg === '-o' || arg === '---output');
  const input = inputCmdIndex > -1 ? args[inputCmdIndex + 1] : './main.dbn';
  const output = outputCmdIndex > -1 ? args[outputCmdIndex + 1] : './draw.svg';
  const fileExists = await checkIfFileExists(input);

  if (!fileExists) {
    console.error('Input file not found.');
    process.exit(1);
  }

  const inputContent = await readFileAsync(input, { encoding: 'utf8' });
  
  if (!inputContent) {
    console.error('Input file cannot be empty.'); 
    process.exit(1);
  }

  const svgContent = compile(inputContent);

  writeFileAsync(output, Buffer.from(svgContent));
}

async function checkIfFileExists(pathToFile: string) {
  try {
    await accessAsync(pathToFile, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

main();
