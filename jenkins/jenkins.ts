import { onDocumentChange } from '@shared/on-document-change';
import { autoSelectMainBranch } from './auto-select-main-branch';
import { requireJiraTicket } from './require-jira-ticket';

onDocumentChange(() => {
	autoSelectMainBranch();
	requireJiraTicket();
});
