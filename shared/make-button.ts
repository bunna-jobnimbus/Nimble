export function makeButton(
	label: string,
	className?: string,
	action?: (event: MouseEvent, button: HTMLButtonElement) => void,
	title?: string
) {
	const button = document.createElement('button');
	button.type = 'button';
	button.innerText = label;

	if (className) {
		button.className = className;
	}

	if (title) {
		button.title = title;
	}

	if (action) {
		button.addEventListener('click', (event) => action(event, button));
	}

	return button;
}
