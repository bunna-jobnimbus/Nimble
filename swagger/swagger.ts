import { onDocumentChange } from '@shared/on-document-change';
import { transformSchema } from './transform-schema';
import { generateRequestable } from './generate-requestable';

onDocumentChange(() => {
	transformSchema();
	generateRequestable();
});
