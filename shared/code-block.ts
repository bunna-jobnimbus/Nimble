import { Optional } from './optional';

export function codeBlock(...blocks: Optional<string>[]) {
	return blocks.filter((x) => x != null).join('\n');
}
