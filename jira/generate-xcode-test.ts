import { codeBlock } from '@shared/code-block';
import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';

export function generateXcodeTest() {
	const testingNotes = getUnmodifiedElement('[data-testid*="common.customfield_10501.label"]');
	if (!testingNotes) return;
	const jnid = document.querySelector('a[data-testid*="current-issue"]')?.textContent;
	if (!jnid) return;

	testingNotes.after(
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
