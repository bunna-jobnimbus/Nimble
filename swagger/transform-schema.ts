import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';
import { SwaggerSchema } from './swagger-types';
import { SwiftCodable } from './swift-types';
import { GRDBTable } from './grdb-types';

export function transformSchema() {
	const table = getUnmodifiedElement<HTMLTableElement>('table.model');
	if (!table) return;

	const schema = new SwaggerSchema(table);

	const codableButton = makeButton('Codable', 'nimble-button margin-left', () => {
		const codable = new SwiftCodable(schema);
		copyToClipboard(codableButton, codable.toString());
		recordEvent('swagger.transformSchema');
	});

	const grdbButton = makeButton('GRDB', 'nimble-button margin-left', () => {
		const table = new GRDBTable(schema);
		copyToClipboard(grdbButton, table.toString());
		recordEvent('swagger.transformSchema');
	});

	table.before(codableButton, grdbButton);
}
