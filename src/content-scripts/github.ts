import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { injectStyle } from '@shared/inject-style';
import { onDocumentChange } from '@shared/on-document-change';
import { Optional } from '@shared/optional';
import { recordClick } from '@shared/record-click';

onDocumentChange(() => {
	alwaysIgnoreWhitespace();
	highlightMyPullRequests();
	visitJiraLink();
	categorizeComment();
});

function highlightMyPullRequests() {
	let userTag = getUnmodifiedElement('meta[name="user-login"]');
	if (!userTag) return;

	let userName = userTag.getAttribute('content');
	injectStyle(`
		.opened-by a[title$='${userName}'] {
			border-radius: 2px;
			padding: 0 2px;
			outline: 2px solid var(--nimble-blue);
		}
	`);
}

function alwaysIgnoreWhitespace() {
	let filesChangedLink: Optional<HTMLAnchorElement> = getUnmodifiedElement('.tabnav-tab[href$="files"]');
	if (!filesChangedLink) return;
	filesChangedLink.href += '?w=1';
	recordClick(filesChangedLink, 'alwaysIgnoreWhitespace');
}

function visitJiraLink() {
	let pullRequestTitle = getUnmodifiedElement('.js-issue-title');
	if (!pullRequestTitle) return;
	pullRequestTitle.innerHTML = pullRequestTitle.innerHTML.replace(
		/(JN-\d+)/,
		'<a target="_blank" href="https://jobnimbus.atlassian.net/browse/$1">$1</a>'
	);
	recordClick(pullRequestTitle.querySelector('a'), 'visitJiraLink');
}

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
	recordClick(button, 'categorizeComment', (event) => {
		event.preventDefault(); // prevent form submission
		textarea.focus();
		textarea.value = `**${icon} ${value}:** `;
		textarea.dispatchEvent(new InputEvent('input'));
	});
	return button;
}
