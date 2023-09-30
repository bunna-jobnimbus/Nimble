import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';

export function copyJnid() {
	const jiraLink = getUnmodifiedElement('a[data-testid*="current-issue"]');
	if (!jiraLink) return;

	jiraLink.after(
		makeButton('Copy JN-ID', {
			className: 'nimble-button margin-left',
			action: (_, button) => {
				copyToClipboard(button, jiraLink.innerText);
				recordEvent('jira.copyJnid');
			},
		})
	);
}
