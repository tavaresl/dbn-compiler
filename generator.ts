import { Tag } from './transformer';

export function generate(tag: Tag) {
  const svgAttrs = createAttributesString(tag.attr);
  const elements = tag.body!.map(node => `<${node.tag} ${createAttributesString(node.attr)}></${node.tag}>`).join('\n');

  return `<svg ${svgAttrs}>\n${elements}\n</svg>`;
}

function createAttributesString(attr: Record<string, any>) {
  return Object.entries(attr).map(([key, value]) => `${key}="${value.toString()}"`).join(' ')
}
