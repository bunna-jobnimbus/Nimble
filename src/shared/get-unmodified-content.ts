/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Optional } from './optional';

const MODIFIED_ATTRIBUTE = 'data-modified-by-nimble';

export function getUnmodifiedElement<ElementType extends HTMLElement>(selector: string): Optional<ElementType> {
	let element = document.querySelector(`${selector}:not([${MODIFIED_ATTRIBUTE}])`);
	element?.setAttribute(MODIFIED_ATTRIBUTE, '');
	return element as ElementType;
}
