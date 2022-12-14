import { AppMiddleware } from '@10up/headless-next/middlewares';

import { NextResponse } from 'next/server';

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /fonts (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api|_next|fonts[\\w-]+\\.\\w+).*)',
	],
};

export async function middleware(...args) {
	const [req] = args;

	if (req.nextUrl.locale === 'default') {
		return NextResponse.redirect(new URL(`/en${req.nextUrl.pathname}`, req.url));
	}

	return AppMiddleware(...args);
}
