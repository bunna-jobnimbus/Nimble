import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { onDocumentChange } from '@shared/on-document-change';
import { recordClick } from '@shared/record-click';

onDocumentChange(() => {
	generateXcodeTests();
});

function generateXcodeTests() {
	const exportButton = getUnmodifiedElement('div:has(> #export-button-toolbar)');
	if (!exportButton) return;

	const generateButton = document.createElement('button');
	generateButton.className = 'nimble-button';
	generateButton.textContent = 'Generate Xcode Tests';
	recordClick(generateButton, 'xray.generateXcodeTests', () => {
		const jnid = window.name.match(/JN-\d+/)?.[0];
		if (!jnid) return;
		const rows = [...document.querySelectorAll<HTMLElement>('.step-fields')];
		const tests = rows.map((row, index) => _getTestFunction(row, index, jnid)).join('\n\n');
		copyToClipboard(generateButton, tests);
	});

	exportButton.after(generateButton);
}

function _getTestFunction(row: HTMLElement, index: number, jnid: string) {
	const summary = [...row.querySelectorAll<HTMLElement>('.ak-renderer-document')]
		.flatMap((cell) => cell.innerText.replaceAll('\n\n', '\n').split('\n'))
		.map((text) => `\t/// ${text}`)
		.join(`\n`);

	return [
		`// https://jobnimbus.atlassian.net/browse/${jnid}`,
		`func test<#T##Case${index + 1}#>_${jnid.replace('-', '_')}() throws {`,
		summary,
		`}`,
	].join('\n');
}
