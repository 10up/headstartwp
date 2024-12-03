'use server';

import { cookies, draftMode, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAME } from '../handlers/previewRouteHandler';

export async function disableDraftMode() {
	const cookieStore = await cookies();
	const headerStore = await headers();
	const draftmode = await draftMode();
	const currentUrl = headerStore.get('x-headstartwp-current-url') ?? '/';
	draftmode.disable();
	cookieStore.delete(COOKIE_NAME);
	redirect(currentUrl);
}
