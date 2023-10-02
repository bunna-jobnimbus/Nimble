import { EventKey } from './event-key';
import { recordEvent } from './record-event';
import { Optional } from './optional';

export function recordClick(
	element: HTMLElement,
	eventKey: EventKey,
	action: Optional<(event: MouseEvent) => void> = null
) {
	element.addEventListener('click', async (event) => {
		action?.(event);
		recordEvent(eventKey);
	});
}
