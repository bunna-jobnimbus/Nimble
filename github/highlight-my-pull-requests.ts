import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { injectStyle } from '@shared/inject-style';

export function highlightMyPullRequests() {
	const userMetaTag = getUnmodifiedElement<HTMLMetaElement>('meta[name="user-login"]');
	if (!userMetaTag) return;

	injectStyle(`.opened-by a[title$='${userMetaTag.content}']`, {
		borderRadius: '2px',
		padding: '0 2px',
		outline: '2px solid var(--nimble-blue)',
	});
}
