const LABEL_ATTRIBUTE = 'data-original-label';

export function copyToClipboard(element: HTMLButtonElement, text: string) {
	const originalLabel = element.getAttribute(LABEL_ATTRIBUTE) ?? element.innerText;
	element.setAttribute(LABEL_ATTRIBUTE, originalLabel);

	// todo: this is only needed because of the xray iframe (replace with navigator.clipboard.writeText)
	const textarea = document.createElement('textarea');
	element.after(textarea);
	textarea.value = text;
	textarea.select();
	document.execCommand('copy');
	textarea.remove();

	element.innerText = 'Copied!';
	window.setTimeout(() => (element.innerText = originalLabel), 500);
}
