import { getUnmodifiedElement } from '@shared/get-unmodified-content';
import { recordEvent } from '@shared/record-event';

export function autoSelectMainBranch() {
	const branchSelector = getUnmodifiedElement<HTMLSelectElement>('input[value="VERSION_BRANCH"] + select');
	if (!branchSelector) return;
	branchSelector.value = 'branches/main';
	recordEvent('jenkins.autoSelectMainBranch');
}
