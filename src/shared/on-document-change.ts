export function onDocumentChange(callback: () => void) {
	new MutationObserver(callback).observe(document.body, { attributes: true, childList: true, subtree: true });
}
