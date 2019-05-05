export function tokenize(sourceCode: string): Token[] {
  return sourceCode.split(/\s+/)
    .filter(token => token)
    .map<Token>(token => isNaN(Number(token))
      ? { type: 'word', value: token }
      : { type: 'number', value: token });
}

export type Token = {
  type: 'word' | 'number';
  value: string;
};
