import { onDocumentChange } from '@shared/on-document-change';
import { generateStruct } from './generate-struct';
import { generateRequestable } from './generate-requestable';

onDocumentChange(() => {
	generateRequestable();
	generateStruct();
});
