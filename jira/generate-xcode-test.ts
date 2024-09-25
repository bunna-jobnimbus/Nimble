import { codeBlock } from '@shared/code-block';
import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';

export function generateXcodeTest() {
	const linkedIssuesLabel = getUnmodifiedElement('[for="issue-link-search"]');
	if (!linkedIssuesLabel) return;
	const jnid = Array.from(
		document.querySelectorAll(
			'[data-testid="issue.issue-view.views.common.issue-line-card.issue-line-card-view.key"]'
		)
	).pop()?.textContent;
	if (!jnid) return;

	linkedIssuesLabel.after(
		makeButton('XCTest', 'nimble-button margin-left', (_, button) => {
			copyToClipboard(button, getXcodeTest(jnid));
			recordEvent('jira.generateXcodeTest');
		})
	);
}

function getXcodeTest(jnid: string) {
	return codeBlock(
		`// https://jobnimbus.atlassian.net/browse/${jnid}`,
		`@MainActor func test<#Name#>_${jnid?.replace('-', '_')}() async throws {`,
		'}'
	);
}
