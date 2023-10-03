import { onDocumentChange } from '@shared/on-document-change';
import { highlightMyTickets } from './highlight-my-tickets';
import { copyJnid } from './copy-jnid';
import { copyDescriptionTemplate } from './copy-description-template';
import { generateXcodeTest } from './generate-xcode-test';

onDocumentChange(() => {
	highlightMyTickets();
	copyDescriptionTemplate();
	copyJnid();
	generateXcodeTest();
});
