import { onDocumentChange } from '@shared/on-document-change';
import { highlightMyTickets } from './highlight-my-tickets';
import { copyJnid } from './copy-jnid';
import { copyDescriptionTemplate } from './copy-description-template';

onDocumentChange(() => {
	highlightMyTickets();
	copyDescriptionTemplate();
	copyJnid();
});
