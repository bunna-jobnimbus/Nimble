import { EventKey } from './event-key';

export async function recordEvent(key: EventKey) {
	const storage = await chrome.storage.sync.get(key);
	storage[key] = (storage[key] ?? 0) + 1;
	await chrome.storage.sync.set(storage);
	console.log(storage); // todo: remove in prod
}
