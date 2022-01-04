import { NextRequest, NextResponse } from 'next/server';
import { parsePath, postsMatchers, postMatchers, searchMatchers } from '@10up/headless-core/data';
import { fetchRedirect, getHeadlessConfig } from '@10up/headless-core/utils';

const ALLOWED_STATIC_PATHS = /^\/.*\.(ico|png|jpg|jpeg)$/g;

const matchers = [
	{ rewrite: '', matcher: postsMatchers, shouldRewrite: false },
	{ rewrite: '/search', matcher: searchMatchers, shouldRewrite: false },
	{ rewrite: '/post', matcher: postMatchers, shouldRewrite: true },
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

	for (const { matcher, rewrite, shouldRewrite } of matchers) {
		const parsedPath = parsePath(matcher, pathname);

		if (Object.keys(parsedPath).length > 0) {
			return shouldRewrite ? rewrite : false;
		}
	}

	return false;
}

function isStaticAssetRequest(req: NextRequest) {
	return req.nextUrl.pathname.match(ALLOWED_STATIC_PATHS);
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
		// TODO: disabling rewrites as the way this is setup completely bypass next.config.js rewrites
		// return NextResponse.rewrite(`${rewrite}${pathname}`);
	}

	return NextResponse.next();
}
