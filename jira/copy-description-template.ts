import { copyToClipboard } from '@shared/copy-to-clipboard';
import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { makeButton } from '@shared/make-button';
import { recordEvent } from '@shared/record-event';

export function copyDescriptionTemplate() {
	const descriptionContainer = getUnmodifiedElement('label#description-field-label');
	if (!descriptionContainer) return;

	const group = document.createElement('div');
	group.append(storyButton, bugButton, designButton);
	descriptionContainer.append(group);
}

function makeTemplateButton(label: string, ...lines: string[]) {
	return makeButton(label, 'nimble-button', (_, button) => {
		copyToClipboard(button, lines.join('\n\n'));
		recordEvent('jira.copyDescriptionTemplate');
	});
}

const placeholder = '<placeholder>';

const storyButton = makeTemplateButton(
	'Story',
	'### Who, what, why?',
	`Who is this for: ${placeholder}`,
	`What: ${placeholder}`,
	`Why: ${placeholder}`,
	'---',
	'### Additional Details',
	placeholder,
	'---',
	'### Design',
	`Figma: ${placeholder}`,
	'---',
	'### Access Profiles',
	placeholder,
	'---',
	'### Analytics/Logging',
	placeholder,
	'---',
	'### Technical Notes',
	placeholder,
	'---',
	'### Cross-team dependencies',
	placeholder
);

const bugButton = makeTemplateButton(
	'Bug',
	'### Reproduction Steps',
	`1. ${placeholder}`,
	'#### Actual result:',
	placeholder,
	'#### Expected result:',
	placeholder,
	'---',
	'### Technical Notes',
	placeholder
);

const designButton = makeTemplateButton(
	'Design',
	'### Who is this for and why?',
	placeholder,
	'---',
	'### Jobs to be done',
	placeholder,
	'---',
	'### Additional Details',
	`Lo-Fi Design Needed Date: ${placeholder}`,
	`Is Mobile driving or supporting: ${placeholder}`
);
