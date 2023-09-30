import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { recordClick } from '@shared/record-click';

export function alwaysIgnoreWhitespace() {
	const filesChangedLink = getUnmodifiedElement<HTMLAnchorElement>('a.tabnav-tab[href$="files"]');
	if (!filesChangedLink) return;
	filesChangedLink.href += '?w=1'; // github uses this query parameter to denote whitespace changes
	recordClick(filesChangedLink, 'github.alwaysIgnoreWhitespace');
}
