import { NextRequest, NextResponse } from 'next/server';
import { parsePath, postsMatchers, postMatchers, searchMatchers } from '@10up/headless-core/data';
import { fetchRedirect, getHeadlessConfig } from '@10up/headless-core/utils';

const matchers = [
	{ rewrite: '', matcher: postsMatchers },
	{ rewrite: '/search', matcher: searchMatchers },
	{ rewrite: '/post', matcher: postMatchers },
];

function isCustomPostType(pathname: string) {
	const postType = pathname.split('/')[1];
	const { customPostTypes } = getHeadlessConfig();
	return customPostTypes.includes(postType);
}

function getRewriteRequest(pathname: string) {
	if (isCustomPostType(pathname)) {
		return false;
	}

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
	const { redirectStrategy } = getHeadlessConfig();

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
		return NextResponse.rewrite(`${rewrite}${pathname}`);
	}

	return NextResponse.next();
}
