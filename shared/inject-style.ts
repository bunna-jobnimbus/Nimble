import { codeBlock } from './code-block';
import { snakeCase } from './snake-case';

export function injectStyle(selector: string, properties: Record<string, string>) {
	var style = document.createElement('style');

	let content: string[] = [];
	for (const property in properties) {
		content.push(`${snakeCase(property)}: ${properties[property]};`);
	}

	style.innerText = `${selector} { ${codeBlock(...content)} }`;
	document.head.appendChild(style);
}
