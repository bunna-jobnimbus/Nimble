import { EventKey } from './event-key';

export async function recordEvent(eventKey: EventKey) {
	const storage = await chrome.storage.sync.get(eventKey);
	storage[eventKey] = (storage[eventKey] ?? 0) + 1;
	await chrome.storage.sync.set(storage);
	console.log(storage); // todo: remove in prod
}
