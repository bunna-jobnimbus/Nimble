export function kebabCase(text: string) {
	return text.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
