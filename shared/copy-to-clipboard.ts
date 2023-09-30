export function copyToClipboard(element: HTMLElement, text: string) {
	const originalButtonText = element.innerHTML;

	const textarea = document.createElement('textarea');
	element.after(textarea);
	textarea.value = text;
	textarea.select();
	document.execCommand('copy');
	textarea.remove();

	element.innerHTML = 'Copied!';
	window.setTimeout(() => {
		element.innerHTML = originalButtonText;
	}, 500);
}
