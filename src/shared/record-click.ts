import { Optional } from './optional';

export function recordClick(
	element: Optional<HTMLElement>,
	key: EventKey,
	action: Optional<(event: MouseEvent) => void> = null
) {
	element?.addEventListener('click', async (event) => {
		action?.(event);
		event.stopPropagation();

		let storage = await chrome.storage.sync.get();
		storage[key] = (storage[key] ?? 0) + 1;
		await chrome.storage.sync.set(storage);
		console.log(storage); // todo: remove in prod
	});
}

type EventKey =
	| 'github.alwaysIgnoreWhitespace'
	| 'github.categorizeComment'
	| 'github.visitJiraLink'
	| 'jira.copyJnid'
	| 'jira.insertDescriptionTemplate'
	| 'swagger.generateRequestable'
	| 'swagger.generateStruct'
	| 'xray.generateXcodeTests';
