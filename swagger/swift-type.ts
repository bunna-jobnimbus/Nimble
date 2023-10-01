import { Optional } from '@shared/optional';

export const swiftType: Record<string, Optional<string>> = {
	string: 'String',
	boolean: 'Bool',
	'integer($int32)': 'Int',
	'number($double)': 'Double',
	'string($date-time)': 'Date',
};
