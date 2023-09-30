import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { injectStyle } from '@shared/inject-style';

export function highlightMyTickets() {
	const metaTag = getUnmodifiedElement<HTMLMetaElement>('meta[name="ajs-remote-user-fullname"]');
	if (!metaTag) return;

	injectStyle(`[data-test-id*='focus-container']:has([alt='${metaTag.content}'])`, {
		outline: '4px solid var(--nimble-blue)',
		outlineOffset: '-4px',
	});
}
