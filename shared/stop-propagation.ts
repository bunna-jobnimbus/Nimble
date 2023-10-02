export function stopPropagation(element: HTMLElement) {
	element.addEventListener('click', (event) => event.stopPropagation());
}
