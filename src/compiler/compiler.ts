import { tokenize } from './tokenizer';
import { parse } from './parser';
import { transform } from './transformer';
import { generate } from './generator';

export function compile(code: string) {
  return generate(transform(parse(tokenize(code))));
}
