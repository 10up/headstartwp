import { AppMiddleware } from '@10up/headless-next/middlewares';

import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(...args) {
	const req = args[0];
	if (
		req.nextUrl.pathname.startsWith('/_next') ||
		req.nextUrl.pathname.includes('/api/') ||
		PUBLIC_FILE.test(req.nextUrl.pathname)
	) {
		return NextResponse.next();
	}

	if (req.nextUrl.locale === 'default') {
		return NextResponse.redirect(new URL(`/en${req.nextUrl.pathname}`, req.url));
	}

	return AppMiddleware(...args);
}
