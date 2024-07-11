import { cookies, draftMode, headers } from 'next/headers';
import React from 'react';
import { redirect } from 'next/navigation';

import { COOKIE_NAME } from '../handlers/previewRouteHandler';

export type PreviewIndicatorProps = {
	className?: string;
};

export const PreviewIndicator: React.FC<PreviewIndicatorProps> = ({ className }) => {
	const { isEnabled } = draftMode();

	if (!isEnabled) {
		return null;
	}

	async function disableDraftMode() {
		'use server';

		const currentUrl = headers().get('x-headstartwp-current-url') ?? '/';
		draftMode().disable();
		cookies().delete(COOKIE_NAME);
		redirect(currentUrl);
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
