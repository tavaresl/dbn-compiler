#! /usr/bin/env node

import { compile } from './compiler/compiler';

console.log(compile(`
  Paper 100
  Pen 0
  Line 50 50 0 100
`));
