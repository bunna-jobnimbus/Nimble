import { Optional } from '@shared/optional';

export class SwaggerEndpoint {
	method: Optional<string>;
	path: Optional<string>;
	description: Optional<string>;
	responseType: Optional<string>;
	parameters: SwaggerEndpointParameter[];

	constructor(operationBlock: Element) {
		this.method = operationBlock.querySelector('.opblock-summary-method')?.textContent;
		this.path = operationBlock.querySelector('.opblock-summary-path')?.getAttribute('data-path');
		this.description = operationBlock.querySelector('.opblock-summary-description')?.textContent;
		this.responseType = operationBlock.querySelector('.responses-wrapper .model-title__text')?.textContent;
		if (operationBlock.querySelector('.responses-wrapper .model-box')?.textContent?.startsWith('[')) {
			this.responseType = `[${this.responseType}]`;
		}
		this.parameters = [...operationBlock.querySelectorAll('td.parameters-col_name')].map((cell) => {
			return new SwaggerEndpointParameter(
				cell.querySelector('.parameter__name')?.textContent?.replace('*', '').trim() || 'unknown',
				cell.querySelector('.parameter__type')?.textContent || 'unknown',
				!!cell.querySelector('.required'),
				cell.querySelector('.parameter__in')?.textContent as Location
			);
		});
	}
}

type Location = '(path)' | '(query)';

class SwaggerEndpointParameter {
	constructor(public name: string, public type: string, public required: boolean, public location: Location) {}
}

export class SwaggerSchema {
	name: Optional<string>;
	properties: SwaggerSchemaProperty[];

	constructor(table: HTMLTableElement) {
		this.name = table.closest('span.model')?.querySelector<HTMLElement>('.model-title__text')?.innerText;
		this.properties = [...table.querySelectorAll<HTMLTableRowElement>('tr.property-row')].map((row) => {
			const cells = row.innerText.split('\t'); // example: 'id\tstring\nnullable: true'
			return new SwaggerSchemaProperty(
				cells[0],
				cells[1]?.split('\n')?.[0],
				row.innerText.includes('nullable: true')
			);
		});
	}
}

export class SwaggerSchemaProperty {
	constructor(public name: string, public type: string, public nullable: boolean) {}
}
