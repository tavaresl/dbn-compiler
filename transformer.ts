import { AST } from './parser';

export function transform(ast: AST) {
  const svgAst: Tag = {
    tag: 'svg',
    attr: {
      width: 100,
      height: 100,
      viewBox: '0 0 100 100',
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
    },
    body: [],
  };
  let penColor = 100;

  while (ast.body.length > 0) {
    const node = ast.body.shift();

    if (!node) {
      continue;
    }

    switch (node.name) {
      case 'Paper': {
        const paperColor = 100 - Number(node.parameters[0].value);

        svgAst.body!.push({
          tag: 'rect',
          attr: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: `rgb(${paperColor}%, ${paperColor}%, ${paperColor}%)`
          },
        });

        break;
      }

      case 'Pen': {
        penColor = 100 - Number(node.parameters[0].value);
        break;
      }

      case 'Line': {
        svgAst.body!.push({
          tag: 'line',
          attr: {
            y1: node.parameters[0].value,
            y2: node.parameters[1].value,
            x1: node.parameters[2].value,
            x2: node.parameters[3].value,
            stroke: `rgb(${penColor}%, ${penColor}%, ${penColor}%)`,
          }
        });
        break;
      }
    }

  }
  return svgAst;
}

export type Tag = {
  tag: string;
  attr: Record<string, any>;
  body?: Tag[];
};
