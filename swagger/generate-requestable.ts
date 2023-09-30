import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { Optional } from '@shared/optional';
import { recordClick } from '@shared/record-click';

export function generateRequestable() {
	const operationBlock = getUnmodifiedElement('.opblock:has(.try-out__btn)');
	if (!operationBlock) return;

	const generateButton = document.createElement('button');
	generateButton.textContent = 'Generate Requestable';
	generateButton.className = 'nimble-button btn margin-left';
	recordClick(generateButton, 'swagger.generateRequestable', () => {
		if (!operationBlock) return;
		copyToClipboard(generateButton, _getRequestable(operationBlock));
	});

	operationBlock.querySelector('.try-out__btn')?.after(generateButton);
}

function _getRequestable(operationBlock: HTMLElement) {
	operationBlock.querySelector<HTMLElement>('.responses-wrapper [data-name="model"]')?.click();
	const description = operationBlock.querySelector<HTMLElement>('.opblock-summary-description')?.innerText ?? '';
	const name = description
		.replaceAll('&', 'and')
		.replaceAll("'", '')
		.replace(/\w+/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
		.replace(/\W/g, '');
	const method = operationBlock?.querySelector<HTMLElement>('.opblock-summary-method')?.innerText.toLowerCase();
	const path = operationBlock
		?.querySelector('.opblock-summary-path')
		?.getAttribute('data-path')
		?.replaceAll('{', '\\(')
		.replaceAll('}', ')');

	const properties: RequestableProperty[] = [];
	[...operationBlock.querySelectorAll<HTMLElement>('td.parameters-col_name')].forEach((param) => {
		properties.push(
			new RequestableProperty(
				param.querySelector<HTMLElement>('.parameter__name')?.innerText.replace('*', '').trim(),
				_getSwiftType(param),
				param.querySelector<HTMLElement>('.parameter__in')?.innerText == '(query)'
			)
		);
	});

	const isArray = operationBlock
		.querySelector<HTMLElement>('.responses-wrapper .model-box')
		?.innerText.startsWith('[');
	let responseType = operationBlock.querySelector<HTMLElement>('.responses-wrapper .model-title')?.innerText;
	if (isArray && responseType) {
		responseType = `[${responseType}]`;
	}

	const propertyList = properties.map((property) => `public let ${property.name}: ${property.type}`).join('\n    ');
	const initializerParams = properties.map((property) => `${property.name}: ${property.type}`).join(', ');
	const initializerBody = properties.map((property) => `self.${property.name} = ${property.name}`).join('\n        ');

	const queryParams = properties
		.filter((property) => property.isQuery)
		.map((property) => `"${property.name}": ${property.name}`)
		.join(', ');

	return [
		`public struct ${name || '<#RequestName#>'}Request: Requestable {`,
		propertyList ? `    ${propertyList}` : null,
		propertyList ? `` : null,
		`    public init(${initializerParams}) {`,
		`        ${initializerBody || '/* public initializer */'}`,
		`    }`,
		``,
		`    public var host: RequestHost { .api }`,
		`    public var method: RequestMethod { .${method || '<#RequestMethod#>'} }`,
		`    public var path: String { "${path || '<#RequestPath#>'}" }`,
		queryParams ? `    public var query: RequestQuery { .init([${queryParams}]) }` : null,
		``,
		`    public typealias Response = ${responseType || `<#ResponseType#>`}`,
		`}`,
	]
		.filter((line) => line != null)
		.join('\n');
}

function _getSwiftType(param: HTMLElement) {
	const optionality = param.querySelector('.required') ? '' : '?';
	switch (param.querySelector<HTMLElement>('.parameter__type')?.innerText) {
		case 'string':
			return 'String' + optionality;
		case 'boolean':
			return 'Bool' + optionality;
		default:
			return '<#Type#>' + optionality;
	}
}

class RequestableProperty {
	name: string;
	type: string;
	isQuery: boolean;

	constructor(name: Optional<string>, type: string, isQuery: boolean) {
		this.name = name ?? `<#Name#>`; // todo: placeholder function
		this.type = type ?? `<#Type#>`; // todo: placeholder function
		this.isQuery = isQuery;
	}
}
