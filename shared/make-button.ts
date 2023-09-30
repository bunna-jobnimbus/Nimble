export function makeButton(config: {
	className: string;
	label: string;
	title?: string;
	action?: (event: MouseEvent) => void;
}) {
	const button = document.createElement('button');
	button.className = config.className;
	button.innerText = config.label;

	if (config.title) {
		button.title = config.title;
	}

	if (config.action) {
		button.addEventListener('click', config.action);
	}

	return button;
}
