import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { onDocumentChange } from '@shared/on-document-change';
import { Optional } from '@shared/optional';

onDocumentChange(() => {
	autoSelectMainBranch();
	requireJiraTicket();
});

function autoSelectMainBranch() {
	const branchSelector: Optional<HTMLSelectElement> = getUnmodifiedElement(
		'.jenkins-form-item:has([value="VERSION_BRANCH"]) select'
	);
	if (!branchSelector) return;
	branchSelector.value = 'branches/main';
}

function requireJiraTicket() {
	const buildButton: Optional<HTMLButtonElement> = getUnmodifiedElement('form[action="build?delay=0sec"] button');
	if (!buildButton) return;

	buildButton.disabled = true;
	const jiraTicketInput = document.querySelector<HTMLInputElement>('[value="JIRA_TICKETS"] + input');
	jiraTicketInput?.addEventListener('input', () => {
		buildButton.disabled = !/JN-\d{5}/.test(jiraTicketInput.value);
	});
}
