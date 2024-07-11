import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchRedirect, getHeadstartWPConfig, getSiteByHost } from '@headstartwp/core/utils';

const ALLOWED_STATIC_PATHS = /^\/.*\.(ico|png|jpg|jpeg)$/g;

function isStaticAssetRequest(req: NextRequest) {
	return req.nextUrl.pathname.match(ALLOWED_STATIC_PATHS);
}

function isInternalRequest(req: NextRequest) {
	return req.nextUrl.pathname.startsWith('/_next');
}

type AppMidlewareOptions = {
	appRouter: boolean;
};

export async function AppMiddleware(
	req: NextRequest,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	options: AppMidlewareOptions = { appRouter: false },
) {
	const response = NextResponse.next();

	if (isStaticAssetRequest(req) || isInternalRequest(req)) {
		return response;
	}

	const hostname = req.headers.get('host') || '';
	const site = getSiteByHost(hostname, req.nextUrl.locale);
	const isMultisiteRequest = site !== null && typeof site.sourceUrl !== 'undefined';

	const { redirectStrategy, sourceUrl } = isMultisiteRequest ? site : getHeadstartWPConfig();

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
		const hostname = req.headers.get('host') || '';
		response.headers.set('x-headstartwp-site', hostname);
		const url = req.nextUrl;

		url.pathname = `/_sites/${hostname}${url.pathname}`;

		return NextResponse.rewrite(url);
	}

	return response;
}
