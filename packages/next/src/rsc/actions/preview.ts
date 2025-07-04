'use server';

import { cookies, draftMode, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAME } from '../handlers/previewRouteHandler';

export async function disableDraftMode() {
	const headersObject = await headers();
	const currentUrl = headersObject.get('x-headstartwp-current-url') ?? '/';
	const { disable } = await draftMode();
	await disable();
	const cookiesObject = await cookies();
	cookiesObject.delete(COOKIE_NAME);
	redirect(currentUrl);
}
