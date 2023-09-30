/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Optional } from './optional';

const MODIFIED_ATTRIBUTE = 'data-modified-by-nimble';

export function getUnmodifiedElement<ElementType extends HTMLElement>(selector: string): Optional<ElementType> {
	const element = document.querySelector<ElementType>(`${selector}:not([${MODIFIED_ATTRIBUTE}])`);
	element?.setAttribute(MODIFIED_ATTRIBUTE, '');
	return element;
}
