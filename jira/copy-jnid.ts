import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';

export function copyJnid() {
	const jiraLink = getUnmodifiedElement('a[data-testid*="current-issue"]');
	if (!jiraLink) return;

	const copyButton = makeButton({
		className: 'nimble-button margin-left',
		label: 'Copy JN-ID',
		action: () => {
			copyToClipboard(copyButton, jiraLink.innerText);
			recordEvent('jira.copyJnid');
		},
	});

	jiraLink.after(copyButton);
}
