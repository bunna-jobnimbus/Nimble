import { codeBlock } from '@shared/code-block';
import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { pascalCase } from '@shared/pascal-case';
import { recordEvent } from '@shared/record-event';

export function generateXcodeTest() {
	const testingNotes = getUnmodifiedElement('[data-testid*="rich-text.customfield_10501"]');
	if (!testingNotes) return;
	const jnid = document.querySelector('a[data-testid*="current-issue"]')?.textContent;
	if (!jnid) return;
	const issueName = pascalCase(document.querySelector('h1[data-testid*="summary.heading"]')?.textContent);
	if (!issueName) return;

	testingNotes.previousSibling?.firstChild?.appendChild(
		makeButton('XCTest', 'nimble-button margin-left', (_, button) => {
			copyToClipboard(button, getXcodeTest(issueName, jnid, testingNotes));
			recordEvent('jira.generateXcodeTest');
		})
	);
}

function getXcodeTest(issueName: string, jnid: string, testingNotes: HTMLElement) {
	const comments = testingNotes.innerText.split(/\n+/g).join('\n\t/// ');
	return codeBlock(
		`// https://jobnimbus.atlassian.net/browse/${jnid}`,
		`func test${issueName}_${jnid?.replace('-', '_')}() throws {`,
		`\t/// ${comments}`,
		'}'
	);
}
