import { NextRequest, NextResponse } from 'next/server';
// eslint-disable-next-line
import { parsePath, postsMatchers, postMatchers, searchMatchers } from '@10up/headless-core/data';
// eslint-disable-next-line import/no-unresolved
import { fetchRedirect, getRedirectStrategy } from '@10up/headless-core/utils';

const matchers = [
	{ rewrite: '/[[...path]]', matcher: postsMatchers },
	{ rewrite: '/search/[...path]', matcher: searchMatchers },
	{ rewrite: '/post/[...path]', matcher: postMatchers },
];

function getRewriteRequest(pathname: string) {
	for (const { matcher, rewrite } of matchers) {
		const parsedPath = parsePath(matcher, pathname);

		if (Object.keys(parsedPath).length > 0) {
			return rewrite;
		}
	}

	return false;
}

function isStaticAssetRequest(req: NextRequest) {
	return req.nextUrl.pathname === '/favicon.ico';
}

export async function AppMiddleware(req: NextRequest) {
	const redirectStrategy = getRedirectStrategy();

	if (isStaticAssetRequest(req)) {
		return NextResponse.next();
	}

	const { pathname } = req.nextUrl;

	if (redirectStrategy === 'always') {
		const redirect = await fetchRedirect(pathname);

		if (redirect.location) {
			return NextResponse.redirect(redirect.location, redirect.status);
		}
	}

	const rewrite = getRewriteRequest(pathname);

	if (rewrite) {
		// return NextResponse.rewrite(rewrite);
	}

	return NextResponse.next();
}
