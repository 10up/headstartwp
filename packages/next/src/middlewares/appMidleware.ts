import { NextRequest, NextResponse } from 'next/server';
// eslint-disable-next-line
import { parsePath, postsMatchers, postMatchers } from '@10up/headless-core/data';

const matchers = [
	{ rewrite: '/[[...path]]', matcher: postsMatchers },
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

export function AppMiddleware(req: NextRequest) {
	const res = NextResponse.next();

	if (isStaticAssetRequest(req)) {
		return res;
	}

	const { pathname } = req.nextUrl;

	const rewrite = getRewriteRequest(pathname);

	if (rewrite) {
		return NextResponse.rewrite(rewrite);
	}

	return res;
}
