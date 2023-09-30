import { onDocumentChange } from '@shared/on-document-change';
import { highlightMyPullRequests } from './highlight-my-pull-requests';
import { alwaysIgnoreWhitespace } from './always-ignore-whitespace';
import { visitJiraLink } from './visit-jira-link';
import { categorizeComment } from './categorize-comment';

onDocumentChange(() => {
	alwaysIgnoreWhitespace();
	highlightMyPullRequests();
	visitJiraLink();
	categorizeComment();
});
