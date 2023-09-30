import { codeBlock } from './code-block';
import { kebabCase } from './kebab-case';

export function injectStyle(selector: string, properties: Record<string, string>) {
	const style = document.createElement('style');

	const content: string[] = [];
	for (const property in properties) {
		content.push(`${kebabCase(property)}: ${properties[property]};`);
	}

	style.innerText = `${selector} { ${codeBlock(...content)} }`;
	document.head.appendChild(style);
}
