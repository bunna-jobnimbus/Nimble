import { codeBlock } from '@shared/code-block';
import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';
import { SwaggerProperty, SwiftProperty } from './swagger-property';
import { Optional } from '@shared/optional';

export function generateStruct() {
	const table = getUnmodifiedElement<HTMLTableElement>('table.model');
	if (!table) return;

	const button = makeButton('Generate Struct', 'nimble-button margin-left', (_, button) => {
		copyToClipboard(button, getStruct(table).toString());
		recordEvent('swagger.generateStruct');
	});

	table.before(button);
}

function getStruct(table: HTMLTableElement) {
	const name = table.closest('span.model')?.querySelector('button')?.innerText;

	const properties = [...table.querySelectorAll<HTMLElement>('tr.property-row')].map((row) => {
		const cells = row.innerText.split('\t'); // example: 'id\tstring\nnullable: true'
		return new SwaggerProperty(
			cells[0],
			cells[1]?.split('\n')?.[0],
			cells[1]?.includes('nullable: true')
		).swift;
	});

	return new SwiftStruct(name, properties);
}

class SwiftStruct {
	name: string;

	constructor(name: Optional<string>, public properties: SwiftProperty[]) {
		this.name = name || '<#StructName#>';
	}

	toString() {
		return codeBlock(
			`public struct ${this.name}: Codable {`,
			...this.properties.flatMap((x) => x.declaration),
			`}`
		);
	}
}
