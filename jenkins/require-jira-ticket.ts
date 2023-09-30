import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { recordEvent } from '@shared/record-event';

export function requireJiraTicket() {
	const buildButton = getUnmodifiedElement<HTMLButtonElement>('form[action*="build"] button');
	if (!buildButton) return;

	buildButton.disabled = true;
	const jiraTicketInput = document.querySelector<HTMLInputElement>('input[value="JIRA_TICKETS"] + input');
	jiraTicketInput?.addEventListener('input', () => {
		buildButton.disabled = !/JN-\d{5}/.test(jiraTicketInput.value);
	});
	recordEvent('jenkins.requireJiraTicket');
}
