import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { onDocumentChange } from '@shared/on-document-change';
import { recordClick } from '@shared/record-click';
import { highlightMyTickets } from './highlight-my-tickets';
import { copyJnid } from './copy-jnid';

onDocumentChange(() => {
	highlightMyTickets();
	insertDescriptionTemplate();
	copyJnid();
});

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
	recordClick(button, 'jira.insertDescriptionTemplate', () => {
		let textarea = document.querySelector<HTMLTextAreaElement>('#description-container #ak-editor-textarea');
		if (!textarea) return;
		textarea.innerHTML = template;
		setTimeout(() => {
			textarea?.focus();
		}, 200);
	});
	return button;
}
