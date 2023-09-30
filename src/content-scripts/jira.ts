import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { injectStyle } from '@shared/inject-style';
import { onDocumentChange } from '@shared/on-document-change';
import { Optional } from '@shared/optional';
import { recordClick } from '@shared/record-click';

onDocumentChange(() => {
	highlightMyTickets();
	insertDescriptionTemplate();
	copyJnid();
});

function highlightMyTickets() {
	let userTag = getUnmodifiedElement('meta[name="ajs-remote-user-fullname"]');
	if (!userTag) return;

	let userName = userTag.getAttribute('content');
	injectStyle(`
		[data-test-id='platform-card.ui.card.focus-container']:has([alt='${userName}']) {
			outline: 4px solid var(--nimble-blue);
			outline-offset: -4px;
		}
	`);
}

function insertDescriptionTemplate() {
	let descriptionContainer = getUnmodifiedElement('#description-field-label');
	if (!descriptionContainer) return;

	let buttonGroup = document.createElement('div');

	let placeholder = `<span contenteditable="false" text="PLACEHOLDER" color="red" class="statusView-content-wrap inlineNodeView"><span class="status-lozenge-span css-0" data-node-type="status" data-color="red">PLACEHOLDER</span></span>`;
	buttonGroup.append(
		_createTemplateButton(
			'Story',
			[
				`<h3>Who, what, why?</h3>`,
				`<p>Who is this for: ${placeholder}</p>`,
				`<p>What: ${placeholder}</p>`,
				`<p>Why: ${placeholder}</p>`,
				`<hr>`,
				`<h3>Additional Details</h3>`,
				`<p>${placeholder}</p>`,
				`<hr>`,
				`<h3>Design</h3>`,
				`<p>Figma: ${placeholder}</p>`,
				`<hr>`,
				`<h3>Access Profiles</h3>`,
				`<p>${placeholder}</p>`,
				`<hr>`,
				`<h3>Analytics/Logging</h3>`,
				`<p>${placeholder}</p>`,
				`<hr>`,
				`<h3>Technical Notes</h3>`,
				`<p>${placeholder}</p>`,
				`<hr>`,
				`<h3>Cross-team dependencies</h3>`,
				`<p>${placeholder}</p>`,
			].join('\n')
		)
	);
	buttonGroup.append(
		_createTemplateButton(
			'Bug',
			[
				`<h3>Reproduction Steps</h3>`,
				`<ol><li>${placeholder}</li></ol>`,
				`<h4>Actual result:</h4>`,
				`<p>${placeholder}</p>`,
				`<h4>Expected result:</h4>`,
				`<p>${placeholder}</p>`,
				`<hr>`,
				`<h3>Technical Notes</h3>`,
				`<p>${placeholder}</p>`,
			].join('\n')
		)
	);
	buttonGroup.append(
		_createTemplateButton(
			'Design',
			[
				`<h3>Who is this for and why?</h3>`,
				`<p>${placeholder}</p>`,
				`<hr>`,
				`<h3>Jobs to be done</h3>`,
				`<p>${placeholder}</p>`,
				`<hr>`,
				`<h3>Additional Details</h3>`,
				`<p>Lo-Fi Design Needed Date: ${placeholder}</p>`,
				`<p>Is Mobile driving or supporting: ${placeholder}</p>`,
			].join('\n')
		)
	);

	descriptionContainer.append(buttonGroup);
}

function _createTemplateButton(label: string, template: string) {
	let button = document.createElement('button');
	button.textContent = label;
	button.className = `nimble-button`;
	recordClick(button, 'insertDescriptionTemplate', () => {
		let textarea = document.querySelector<HTMLTextAreaElement>('#description-container #ak-editor-textarea');
		if (!textarea) return;
		textarea.innerHTML = template;
		setTimeout(() => {
			textarea?.focus();
		}, 200);
	});
	return button;
}

function copyJnid() {
	let jiraLink = getUnmodifiedElement(
		'[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]'
	);
	if (!jiraLink) return;

	let copyButton = document.createElement('button');
	copyButton.className = 'nimble-button margin-left';
	copyButton.textContent = 'Copy JN-ID';
	recordClick(copyButton, 'copyJnid', () => {
		if (!jiraLink?.innerText) return;
		copyToClipboard(copyButton, jiraLink.innerText);
	});

	jiraLink.after(copyButton);
}
