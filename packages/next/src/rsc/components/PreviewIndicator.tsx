import { draftMode } from 'next/headers';
import React from 'react';
import { disableDraftMode } from '../actions/preview';

export type PreviewIndicatorProps = {
	className?: string;
};

export const PreviewIndicator: React.FC<PreviewIndicatorProps> = ({ className }) => {
	const { isEnabled } = draftMode();

	if (!isEnabled) {
		return null;
	}

	return (
		<div className={className}>
			<form action={disableDraftMode}>
				You are previewing the current page.
				<button type="submit">Exit Preview</button>
			</form>
		</div>
	);
};
