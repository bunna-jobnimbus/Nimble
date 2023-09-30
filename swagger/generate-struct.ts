import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { Optional } from '@shared/optional';
import { recordClick } from '@shared/record-click';

export function generateStruct() {
	const table = getUnmodifiedElement<HTMLTableElement>('table.model');
	if (!table) return;

	// todo: create button helper
	const generateButton = document.createElement('button');
	generateButton.textContent = 'Generate Struct';
	generateButton.className = 'nimble-button margin-left';
	recordClick(generateButton, 'swagger.generateStruct', () => {
		if (!table) return;
		copyToClipboard(generateButton, _getStruct(table));
	});

	table.before(generateButton);
}

function _getStruct(table: HTMLTableElement) {
	const name = table.closest('span.model')?.querySelector('button')?.innerText;
	const rows = [...table.querySelectorAll<HTMLElement>('tr.property-row')].map(_getStructProperty).join('\n');
	// todo: line printer
	return [`public struct ${name ?? '<#StructName#>'}: Codable {`, rows, `}`].join('\n');
}

function _getStructProperty(row: HTMLElement) {
	const cells = row.innerText.split('\t'); // 'id\tstring\nnullable: true'

	const name = cells[0];
	const swaggerType = cells[1].split('\n')?.[0] ?? 'UnknownType';
	const optional = cells[1]?.includes('nullable: true');
	const type = swaggerToSwiftType[swaggerType] ?? `<#${swaggerType}#>`;

	return `\tpublic let ${name}: ${type}${optional ? '?' : ''}`;
}

const swaggerToSwiftType: Record<string, Optional<string>> = {
	string: 'String',
	boolean: 'Bool',
	'integer($int32)': 'Int',
	'number($double)': 'Double',
	'string($date-time)': 'Date',
};
