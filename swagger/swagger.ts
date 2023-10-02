import { onDocumentChange } from '@shared/on-document-change';
import { generateCodable } from './generate-codable';
import { generateRequestable } from './generate-requestable';

onDocumentChange(() => {
	generateCodable();
	generateRequestable();
});
