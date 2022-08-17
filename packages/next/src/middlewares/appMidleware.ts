import { NextRequest, NextResponse } from 'next/server';
import { fetchRedirect, getHeadlessConfig } from '@10up/headless-core/utils';

const ALLOWED_STATIC_PATHS = /^\/.*\.(ico|png|jpg|jpeg)$/g;

function isStaticAssetRequest(req: NextRequest) {
	return req.nextUrl.pathname.match(ALLOWED_STATIC_PATHS);
}

function isInternalRequest(req: NextRequest) {
	return req.nextUrl.pathname.startsWith('/_next');
}

export async function AppMiddleware(req: NextRequest) {
	const { redirectStrategy } = getHeadlessConfig();

	if (isStaticAssetRequest(req) || isInternalRequest(req)) {
		return NextResponse.next();
	}

	const { pathname } = req.nextUrl;

	if (redirectStrategy === 'always') {
		const redirect = await fetchRedirect(pathname);

		if (redirect.location) {
			return NextResponse.redirect(redirect.location, redirect.status);
		}
	}

	return NextResponse.next();
}
