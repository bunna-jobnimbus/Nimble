import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { recordClick } from '@shared/record-click';
import { stopPropagation } from '@shared/stop-propagation';

export function visitJiraLink() {
	const pullRequestTitle = getUnmodifiedElement('.js-issue-title');
	if (!pullRequestTitle) return;

	pullRequestTitle.innerHTML = pullRequestTitle.innerHTML.replace(
		/(JN-\d+)/g,
		'<a target="_blank" href="https://jobnimbus.atlassian.net/browse/$1">$1</a>'
	);

	pullRequestTitle.querySelectorAll('a').forEach((link) => {
		recordClick(link, 'github.visitJiraLink');
		stopPropagation(link);
	});
}
