import { NextRequest, NextResponse } from 'next/server';
import { fetchRedirect, getHeadlessConfig, getSiteByHost } from '@10up/headless-core/utils';

const ALLOWED_STATIC_PATHS = /^\/.*\.(ico|png|jpg|jpeg)$/g;

function isStaticAssetRequest(req: NextRequest) {
	return req.nextUrl.pathname.match(ALLOWED_STATIC_PATHS);
}

function isInternalRequest(req: NextRequest) {
	return req.nextUrl.pathname.startsWith('/_next');
}

export async function AppMiddleware(req: NextRequest) {
	if (isStaticAssetRequest(req) || isInternalRequest(req)) {
		return NextResponse.next();
	}

	const hostname = req.headers.get('host') || '';
	const site = getSiteByHost(hostname, req.nextUrl.locale);
	const isMultisiteRequest = site !== null && typeof site.sourceUrl !== 'undefined';

	const { redirectStrategy, sourceUrl } = isMultisiteRequest ? site : getHeadlessConfig();

	if (!sourceUrl) {
		throw new Error('Site not found.');
	}

	const { pathname } = req.nextUrl;

	if (redirectStrategy === 'always') {
		const redirect = await fetchRedirect(pathname, sourceUrl || '');

		if (redirect.location) {
			return NextResponse.redirect(redirect.location, redirect.status);
		}
	}

	if (req.nextUrl.pathname.endsWith('/page/1') || req.nextUrl.pathname.endsWith('/page/1/')) {
		return NextResponse.redirect(req.url.replace('/page/1', ''));
	}

	if (isMultisiteRequest) {
		const url = req.nextUrl;
		const hostname = req.headers.get('host') || '';
		url.pathname = `/_sites/${hostname}${url.pathname}`;
		return NextResponse.rewrite(url);
	}

	return NextResponse.next();
}
