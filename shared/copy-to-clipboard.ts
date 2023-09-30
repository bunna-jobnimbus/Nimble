const LABEL_ATTRIBUTE = 'data-original-label';

export function copyToClipboard(button: HTMLButtonElement, text: string) {
	const originalLabel = button.getAttribute(LABEL_ATTRIBUTE) ?? button.innerText;
	button.setAttribute(LABEL_ATTRIBUTE, originalLabel);

	// todo: this is only needed because of the xray iframe (replace with navigator.clipboard.writeText)
	const textarea = document.createElement('textarea');
	button.after(textarea);
	textarea.value = text;
	textarea.select();
	document.execCommand('copy');
	textarea.remove();

	button.innerText = 'Copied!';
	window.setTimeout(() => (button.innerText = originalLabel), 500);
}
