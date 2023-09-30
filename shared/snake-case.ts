export function snakeCase(text: string) {
	return text.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
