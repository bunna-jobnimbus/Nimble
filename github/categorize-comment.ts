import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { recordEvent } from '@shared/record-event';
import { makeButton } from '@shared/make-button';

export function categorizeComment() {
	const commentForm = getUnmodifiedElement('form.js-inline-comment-form');
	if (!commentForm) return;

	const textarea = commentForm.querySelector<HTMLTextAreaElement>('textarea');
	if (!textarea) return;

	const group = document.createElement('div');
	group.className = 'conventional-comments position-absolute';
	group.append(
		makeCategoryButton('🚫', 'issue', textarea),
		makeCategoryButton('🎉', 'praise', textarea),
		makeCategoryButton('💡', 'suggestion', textarea),
		makeCategoryButton('🤔', 'question', textarea),
		makeCategoryButton('🧶', 'nitpick', textarea),
		makeCategoryButton('🐷', 'pork', textarea)
	);

	commentForm.querySelector('tab-container')?.append(group);
}

function makeCategoryButton(icon: string, value: string, textarea: HTMLTextAreaElement) {
	return makeButton(
		icon,
		'Button conventional-comment',
		() => {
			textarea.focus();
			textarea.value = `**${icon} ${value}:** `;
			textarea.dispatchEvent(new InputEvent('input'));
			recordEvent('github.categorizeComment');
		},
		value
	);
}
