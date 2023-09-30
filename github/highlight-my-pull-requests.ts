import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { injectStyle } from '@shared/inject-style';

export function highlightMyPullRequests() {
	let userTag = getUnmodifiedElement<HTMLMetaElement>('meta[name="user-login"]');
	if (!userTag) return;

	let userName = userTag.content;
	injectStyle(`.opened-by a[title$='${userName}']`, {
		borderRadius: '2px',
		padding: '0 2px',
		outline: '2px solid var(--nimble-blue)',
	});
}
