'use server';

import { cookies, draftMode, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAME } from '../handlers/previewRouteHandler';

export async function disableDraftMode() {
	const currentUrl = headers().get('x-headstartwp-current-url') ?? '/';
	draftMode().disable();
	cookies().delete(COOKIE_NAME);
	redirect(currentUrl);
}
