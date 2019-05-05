import { Token } from "./lexer";

export function parse(tokens: Token[]) {
  const AST: AST = {
    type: 'Drawing',
    body: [],
  };

  while (tokens.length > 0) {
    const currentToken = tokens.shift();

    if (!currentToken || currentToken.type !== 'word') {
      continue;
    }

    switch (currentToken.value) {
      case 'Pen':
      case 'Paper': {
        const expression: CallExpression = {
          type: 'CallExpression',
          name: currentToken.value,
          parameters: [],
        };

        const argument = tokens.shift();

        if (!argument || argument.type !== 'number') {
          throw new Error('Paper command must be followed by a number.');
        }

        expression.parameters.push({
          type: 'NumberLiteral',
          value: argument.value,
        });

        AST.body.push(expression);

        break;
      }

      case 'Line': {
        const expression: CallExpression = {
          type: 'CallExpression',
          name: 'Line',
          parameters: [],
        };

        const paperArguments = tokens.splice(0, 4);

        if (paperArguments.some(argument => !argument || argument.type !== 'number')) {
          throw new Error('Line command must be followed by four numbers.')
        }

        paperArguments.forEach(argument => expression.parameters.push({
          type: 'NumberLiteral',
          value: argument.value,
        }));

        AST.body.push(expression);

        break;
      }
    }
  }

  return AST;
}

export type AST = {
  type: 'Drawing';
  body: CallExpression[];
};

export type NumberLiteral = {
  type: string;
  value: string;
};

export type CallExpression = {
  type: string;
  name: string;
  parameters: NumberLiteral[]
};
