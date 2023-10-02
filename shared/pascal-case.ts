import { Optional } from './optional';

export function pascalCase(text: Optional<string>) {
	return text
		?.replaceAll('&', 'And')
		.replaceAll("'", '')
		.replaceAll('.', '')
		.replace(/\w+/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
		.replaceAll(' ', '');
}
