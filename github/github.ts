import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { onDocumentChange } from '@shared/on-document-change';
import { Optional } from '@shared/optional';
import { recordClick } from '@shared/record-click';
import { highlightMyPullRequests } from './highlight-my-pull-requests';
import { alwaysIgnoreWhitespace } from './always-ignore-whitespace';
import { visitJiraLink } from './visit-jira-link';

onDocumentChange(() => {
	alwaysIgnoreWhitespace();
	highlightMyPullRequests();
	visitJiraLink();
	categorizeComment();
});

function categorizeComment() {
	let commentForm = getUnmodifiedElement('.js-inline-comment-form');
	if (!commentForm) return;

	let container = document.createElement('div');
	container.className = 'conventional-comments position-absolute';
	let textarea: Optional<HTMLTextAreaElement> = commentForm.querySelector('textarea');
	if (!textarea) return;

	container.append(_createCategoryButton('🚫', 'issue', textarea));
	container.append(_createCategoryButton('🎉', 'praise', textarea));
	container.append(_createCategoryButton('💡', 'suggestion', textarea));
	container.append(_createCategoryButton('🤔', 'question', textarea));
	container.append(_createCategoryButton('🧶', 'nitpick', textarea));
	container.append(_createCategoryButton('🐷', 'pork', textarea));

	commentForm.querySelector('tab-container')?.append(container);
}

function _createCategoryButton(icon: string, value: string, textarea: HTMLTextAreaElement) {
	let button = document.createElement('button');
	button.className = 'Button conventional-comment';
	button.innerHTML = icon;
	button.title = value;
	recordClick(button, 'github.categorizeComment', (event) => {
		event.preventDefault(); // prevent form submission
		textarea.focus();
		textarea.value = `**${icon} ${value}:** `;
		textarea.dispatchEvent(new InputEvent('input'));
	});
	return button;
}
