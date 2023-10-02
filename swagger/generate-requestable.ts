import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';
import { SwiftRequestable } from './swift-types';
import { SwaggerEndpoint } from './swagger-types';

export function generateRequestable() {
	const tryItOutButton = getUnmodifiedElement('button.try-out__btn');
	if (!tryItOutButton) return;
	const operationBlock = tryItOutButton.closest('.opblock');
	if (!operationBlock) return;

	const button = makeButton('Requestable', 'nimble-button btn margin-left', () => {
		operationBlock.querySelectorAll<HTMLAnchorElement>('a[data-name="model"]').forEach((link) => link.click()); // ensure schemas are visible
		const requestable = new SwiftRequestable(new SwaggerEndpoint(operationBlock));
		copyToClipboard(button, requestable.toString());
		recordEvent('swagger.generateRequestable');
	});

	tryItOutButton.after(button);
}
