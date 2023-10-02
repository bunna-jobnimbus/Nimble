import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';
import { SwaggerSchema } from './swagger-types';
import { SwiftCodable } from './swift-types';

export function generateCodable() {
	const table = getUnmodifiedElement<HTMLTableElement>('table.model');
	if (!table) return;

	const button = makeButton('Codable', 'nimble-button margin-left', () => {
		const codable = new SwiftCodable(new SwaggerSchema(table));
		copyToClipboard(button, codable.toString());
		recordEvent('swagger.generateCodable');
	});

	table.before(button);
}
