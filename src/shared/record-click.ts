import { Optional } from './optional';

export function recordClick(
	element: Optional<HTMLElement>,
	key: string,
	action: Optional<(event: MouseEvent) => void> = null
) {
	element?.addEventListener('click', async (event) => {
		action?.(event);
		event.stopPropagation();

		let storage = await chrome.storage.sync.get();
		storage[key] = (storage[key] ?? 0) + 1;
		await chrome.storage.sync.set(storage);
		console.log(storage);
	});
}
