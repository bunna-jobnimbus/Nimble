import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { recordClick } from '@shared/record-click';

export function visitJiraLink() {
	const pullRequestTitle = getUnmodifiedElement('bdi.js-issue-title');
	if (!pullRequestTitle) return;
	pullRequestTitle.innerHTML = pullRequestTitle.innerHTML.replace(
		/(JN-\d+)/g,
		'<a target="_blank" href="https://jobnimbus.atlassian.net/browse/$1">$1</a>'
	);
	recordClick(pullRequestTitle.querySelector('a'), 'github.visitJiraLink');
}
