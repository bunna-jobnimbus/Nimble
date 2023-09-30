export function makeButton(
	label: string,
	config: {
		className?: string;
		title?: string;
		action?: (event: MouseEvent, button: HTMLButtonElement) => void;
	} = {}
) {
	const button = document.createElement('button');
	button.innerText = label;

	if (config.className) {
		button.className = config.className;
	}

	if (config.title) {
		button.title = config.title;
	}

	if (config.action) {
		button.addEventListener('click', (event) => config.action?.(event, button));
	}

	return button;
}
