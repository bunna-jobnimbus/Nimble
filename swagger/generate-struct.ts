import { codeBlock } from '@shared/code-block';
import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';
import { SwaggerProperty } from './swagger-property';

export function generateStruct() {
	const table = getUnmodifiedElement<HTMLTableElement>('table.model');
	if (!table) return;

	const button = makeButton('Generate Struct', {
		className: 'nimble-button margin-left',
		action: (_, button) => {
			copyToClipboard(button, getStruct(table));
			recordEvent('swagger.generateStruct');
		},
	});

	table.before(button);
}

function getStruct(table: HTMLTableElement) {
	const name = table.closest('span.model')?.querySelector('button')?.innerText;

	const rows = [...table.querySelectorAll<HTMLTableRowElement>('tr.property-row')].map((row) => {
		const cells = row.innerText.split('\t'); // example: 'id\tstring\nnullable: true'
		return new SwaggerProperty(
			cells[0],
			cells[1]?.split('\n')?.[0],
			cells[1]?.includes('nullable: true')
		).swift.declaration;
	});

	return codeBlock(`public struct ${name ?? '<#StructName#>'}: Codable {`, ...rows, `}`);
}
